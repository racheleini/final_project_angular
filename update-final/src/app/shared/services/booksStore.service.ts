import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable, Subject } from 'rxjs';
import { VolumeInfo } from '../models/volumeInfo.model';

@Injectable({
  providedIn: 'root'
})
export class BooksStoreService {

  subject = new Subject();
  AllCurrentListBooks: Book[];
  valumeInfroBook: VolumeInfo;
  currentStringSearch: string="";
  constructor(private http: HttpClient) { }

  getCurrentListBooks(stringSearch: string): Observable<Book[]> {
   this.updateCurrentStringSearch(stringSearch);
    return this.http
      .get<Book[]>(`https://www.googleapis.com/books/v1/volumes?q=${stringSearch}&maxResults=40&fields=items(saleInfo%2FlistPrice%2CvolumeInfo(authors%2Cdescription%2CimageLinks(smallThumbnail%2Cthumbnail)%2Clanguage%2CmainCategory%2CpageCount%2CpublishedDate%2Cpublisher%2Csubtitle%2Ctitle))`);
  }
  addBookToCustomerCart(currentBookForSave: VolumeInfo) {
    let listCartBooks = this.getAllBooksFromCustomerCart();
    listCartBooks.push(currentBookForSave);
  

    localStorage.setItem("customerCart", JSON.stringify(listCartBooks));
    this.subject.next(this.getAllBooksFromCustomerCart())
  }

  clearAllCustomerCart() {
    localStorage.setItem("customerCart", "[]");
  }
  getAllBooksFromCustomerCart() {
    let listCartBooks = localStorage.getItem("customerCart");
    return listCartBooks ? JSON.parse(listCartBooks) : [];
  }
  clearSpecificBookFromCustomerCart(currentBookForDelete: VolumeInfo) {
    let listCartBooks = this.getAllBooksFromCustomerCart();
    var i=listCartBooks.length;
    //need clear only same book
    while (i--) {                                       
      if(listCartBooks[i].subtitle==currentBookForDelete.subtitle && 
        listCartBooks[i].title==currentBookForDelete.title){//found same sub title and title
          listCartBooks.splice(i,1);                         //clear from cart list
          break;
      }
  }
    localStorage.setItem("customerCart", JSON.stringify(listCartBooks));
    this.subject.next(this.getAllBooksFromCustomerCart());
  }
  updateCurrentStringSearch(newcStringSearch) {
    this.currentStringSearch = newcStringSearch;
  }
}
