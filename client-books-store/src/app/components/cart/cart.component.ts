import { Component} from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { BooksStoreService } from '../../shared/services/booksStore.service';
import { VolumeInfo } from '../../shared/models/volumeInfo.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  {
  currentBooksList: Book[];
  constructor(private bookStoreService: BooksStoreService) {
    this.currentBooksList=bookStoreService.getAllBooksFromCustomerCart();
    this.bookStoreService.subject.subscribe(
      {
        next: (v: any) => {
          this.currentBooksList = v;
        }
      })
  }
  clearAllCartCustomer(){
    this.bookStoreService.clearAllCustomerCart();//not update
    this.currentBooksList=this.bookStoreService.getAllBooksFromCustomerCart();
  }
 


}
