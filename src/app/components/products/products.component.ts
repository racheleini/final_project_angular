import { Component } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { BooksStoreService } from '../../shared/services/booksStore.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  currentBooksList: Book[];
  search: string = "";
  constructor(private bookStoreService: BooksStoreService) {
    this.search = bookStoreService.currentStringSearch;
    this.searchBooks(this.search);
  }

  searchBooks(stringToSearch): void {
    if(stringToSearch!=""){
    this.bookStoreService.getCurrentListBooks(stringToSearch)
      .subscribe(listRes => {
        this.currentBooksList = listRes["items"];
      }, error => { error.status == "403" ? alert(error.status + "The site was blocked. Try later") : alert("ops!!! something worng"); }
      );
    }
  }
}
