import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
  searchText: string = '';
  suggestions: string[] = [];
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.searchInput.nativeElement.focus();
  }

  searchProducts(): void {
    this.router.navigate(['search', this.searchText, 1]);
  }

  async handleInputChange(): Promise<void> {
    if (this.searchText.length > 1) {
      const response = await this.productService.getProductSearchSuggestions(this.searchText).toPromise();
      if (response && response.data) {
        this.suggestions = response.data;
      } else {
        this.suggestions = [];
      }
    } else {
      this.suggestions = [];
    }
  }
}