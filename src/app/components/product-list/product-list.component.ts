import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy, OnChanges {
  
  constructor(public productService: ProductService, private route: ActivatedRoute) {
  } // Inject the IProductService

  public products: Product[] = [];

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const urlSegment = urlSegments[0].path;
      console.log(urlSegment);  
      this.productService.getProductsByCategory(urlSegment).subscribe((response) =>{
        console.log("resp2");
        console.log(response.data);
        if (response!=null && response.data!=null){
          this.products=response.data;
        }
      });
    });
  }

  ngOnDestroy(): void {
    // this.productService.unsubscribeFromProductChanges();
  }

  ngOnChanges(): void{
    console.log("changes");
  }
  

  private updateView(): void {
    // Implement the logic to update the view
  }

  public getPriceText(product: any): string {
    const variants = product.variants;
    if (variants.length === 0) {
      return '';
    } else if (variants.length === 1) {
      return `$${variants[0].Price}`;
    }
    const minPrice = Math.min(...variants.map((v: any) => v.Price));
    return `Starting at $${minPrice}`;
  }

  getPageNumbers(): number[] {
    const pageCount = this.productService.pageCount;
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
