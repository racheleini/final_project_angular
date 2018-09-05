import { Component, OnInit } from '@angular/core';
import { VolumeInfo } from '../../shared/models/volumeInfo.model';
import { Customer } from '../../shared/models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer.service';
import { BooksStoreService } from '../../shared/services/booksStore.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentBook: VolumeInfo;
  customer: Customer;
  constructor(private route: ActivatedRoute, public booksStoreService: BooksStoreService,
    public customerService: CustomerService, public router: Router) {
    this.currentBook = this.booksStoreService.valumeInfroBook;
    
  }

  ngOnInit() {
    this.customer = this.customerService.isAnExistingCustomer();
   console.log(this.customer);
  }

  addCustomerCart() {
    this.booksStoreService.addBookToCustomerCart(this.currentBook);
  }


  backProductsPage() {
    this.router.navigate(['/front-end-books-store/products']);
  }

}