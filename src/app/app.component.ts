import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-ecommerce';
  staticProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProduct(1).subscribe(
      (response) => {
        this.staticProduct = response.data;
      },
      (error) => {
        console.error('Failed to fetch product:', error);
      }
    );
  }
}

