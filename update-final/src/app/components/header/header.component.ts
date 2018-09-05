import { Component } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   currentCustomer: Customer;
  // IsAnExistingCustomer: boolean;
   constructor(private customerService: CustomerService) {
     this.currentCustomer = this.customerService.isAnExistingCustomer();
     //if there is not any data about customer init to guest
    
    this.customerService.subject.subscribe(
      {
        next: (v: any) => {
          this.currentCustomer = v;
        }
      })
      
  }


}
