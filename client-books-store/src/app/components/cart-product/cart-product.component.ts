import { Component, Input } from '@angular/core';
import { VolumeInfo } from '../../shared/models/volumeInfo.model';
import { BooksStoreService } from '../../shared/services/booksStore.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent{
  @Input()
  currentBook:VolumeInfo;
  
  constructor(private bookStoreService:BooksStoreService) { 
  }
  clearSpecificBookOfCustomer(){
    this.bookStoreService.clearSpecificBookFromCustomerCart(this.currentBook);

  }

}