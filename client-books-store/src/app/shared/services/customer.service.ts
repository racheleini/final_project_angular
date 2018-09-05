import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  currentCustomer: Customer;
// URL: string = "https://angularseldatfinal.herokuapp.com/api";
//                http://localhost:3500/api/existCurrentCustomerLogin

   URL: string = "http://localhost:3500/api";
  subject = new Subject();

  constructor(public httpClient: HttpClient, private router: Router) {
    this.currentCustomer = null;
  }
  isAnExistingCustomer(): Customer {
    return JSON.parse(localStorage.getItem('currentCustomer'));
  }
  loginCustomerValid(customerForChecking): void {
    this.httpClient.post(this.URL + "/existCurrentCustomerLogin", customerForChecking).subscribe(
      (res) => {
        console.log(res);
        if (JSON.stringify(res) != "[]") {
          localStorage.setItem('currentCustomer', JSON.stringify(res));
          this.subject.next(this.isAnExistingCustomer());//follow after changes
          this.currentCustomer = res;
          this.router.navigate(['/home']);
        }
        else {
          this.router.navigate(['/account/register']);
        }
      }, err => {

        alert("cann't login");
      }
    )
  }
  //sent for checking and save new customer
  registerCustomerValid(newCustomer): void {
    this.httpClient.post(this.URL + "/addCustomerRegister", newCustomer).subscribe(
      (res) => {
        localStorage.setItem('currentCustomer', JSON.stringify(res));
        this.subject.next(this.isAnExistingCustomer());//follow after changes
      }, err => {
        if (err.status == "402")
          alert("cann't add register there is same user name");
      }
    )
  }

  logout() {
    localStorage.clear();
    this.subject.next(this.isAnExistingCustomer());//follow after changes
  }

}



