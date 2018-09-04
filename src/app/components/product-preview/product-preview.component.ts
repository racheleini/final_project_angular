import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VolumeInfo } from '../../shared/models/volumeInfo.model';
import { BooksStoreService } from '../../shared/services/booksStore.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent  {
@Input()
currentBook:VolumeInfo;

  constructor(private route: ActivatedRoute,private router: Router,public bookService: BooksStoreService) { }
  
  viewBookDetails() {
    //update servise about which book view details now
    this.bookService.valumeInfroBook = this.currentBook;
    this.router.navigate(['/productdetails']);
  }

}