import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Replace 'path-to-cart-service' with the actual path to your CartService
import { LocalStorageService } from 'ngx-webstorage'; // Import LocalStorageService from 'ngx-webstorage'


@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent implements OnInit, OnDestroy {
  cartItemsCount: number = 0;
  private cartSubscription: any;

  constructor(private cartService: CartService, private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.cartItemsCount = this.getCartItemsCount();

    this.cartService.onChange.subscribe(() => {
      this.cartItemsCount = this.getCartItemsCount();
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  private getCartItemsCount(): number {
    const count = this.localStorage.retrieve('cartItemsCount');
    return count || 0;
  }
}

