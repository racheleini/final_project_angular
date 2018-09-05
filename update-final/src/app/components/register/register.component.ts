import { Component } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';
import { FormGroup, FormControl, ValidatorFn} from '@angular/forms';
import { CustomerService } from '../../shared/services/customer.service';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
 title = 'valid data';
  formGroup: FormGroup;
   obj: typeof Object = Object;


constructor(private customerService:CustomerService,private router:Router) {
  let formGroupConfig = {
    firstName: new FormControl("", this.createValidatorArr("name", 2, 15,/^[A-Za-z ]+$/)),
    lastName: new FormControl("", this.createValidatorArr("name", 2, 15,/^[A-Za-z ]+$/)),
    userName: new FormControl("", this.createValidatorArr("name", 3, 15,/^[A-Za-z ]+$/)),
    password: new FormControl("", this.createValidatorArr("password", 5, 10))
  };

  this.formGroup = new FormGroup(formGroupConfig);
}

//----------------METHODS-------------------
submitRegisterSave() {
  this.customerService.logout();
  let currentCustomer: Customer = this.formGroup.value;
  this.customerService.registerCustomerValid(currentCustomer);
  this.router.navigate(['/front-end-books-store/home']);
}

createValidatorArr(cntName: string, min: number, max: number,pattern?:RegExp): Array<ValidatorFn> {
  return [
    f => !f.value ? { "val": `${cntName} is required` } : null,
    f => f.value && pattern&&!f.value.match (pattern) ? { "val": `${cntName} is contain only english letter` } : null,
    f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
    f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null
  ];
}
}

