import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './model/product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'angular-ecommerce';
  staticProduct: Product | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  ngOnChanges(){
  }
}

