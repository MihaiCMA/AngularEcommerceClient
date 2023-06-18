import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: 'featured-products.component.html',
  styleUrls: ['featured-products.component.css']
})

export class FeaturedProductsComponent implements OnInit, OnDestroy {
  constructor(public productService: ProductService) {}

  public products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        response != null && response.data != null ?
        this.products = response.data: null;
      }
    );
    this.productService.subscribeToProductChanges();
  }

  ngOnDestroy(): void {
    this.productService.unsubscribeFromProductChanges();
  }
}