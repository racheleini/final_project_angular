import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { error } from '../../../../node_modules/protractor';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
currentCustomer:Customer;
 URL: string = "https://tranquil-island-93018.herokuapp.com/api";
subject = new Subject();

constructor(public httpClient: HttpClient) {
  this.currentCustomer = null;
}
  isAnExistingCustomer(): Customer {
    return JSON.parse(localStorage.getItem('currentCustomer'));
  }
  loginCustomerValid(customerForChecking):void {
    this.httpClient.post(this.URL+"/existCurrentCustomerLogin",customerForChecking).subscribe(
      (res)=>{
        localStorage.setItem('currentCustomer',JSON.stringify(res));
        this.subject.next(this.isAnExistingCustomer());//follow after changes
        this.currentCustomer=res;
      },err=>{alert("cann't login"+err);}
    )
  }
  //sent for checking and save new customer
  registerCustomerValid(newCustomer):void {
    this.httpClient.post(this.URL+"/addCustomerRegister",newCustomer).subscribe(
      (res)=>{
        localStorage.setItem('currentCustomer',JSON.stringify(res));
        this.subject.next(this.isAnExistingCustomer());//follow after changes
      },err=>{alert("cann't add register"+err);}
    )
  }

  logout() {
    localStorage.clear();
    this.subject.next(this.isAnExistingCustomer());//follow after changes
  }

}

  

