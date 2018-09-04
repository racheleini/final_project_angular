import { Component } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  currentCustomer: Customer;
  constructor(private customerService: CustomerService) {
    this.currentCustomer = this.customerService.isAnExistingCustomer();
    this.customerService.subject.subscribe(
      {
        next: (v: any) => {
          this.currentCustomer = v;
        }
      }
    )
  }

  logoutCustomer() {
    this.customerService.logout();

  }

}


