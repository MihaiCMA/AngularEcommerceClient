import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ServiceResponse } from '../model/serviceResponse';
import { CartProductResponse } from '../model/cartProductResponse';
import { CartItem } from '../model/cartItem';
import { environment } from 'src/environments';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseUrl: string = `${environment.hostUrl}/api/cart`;
  private onChangeSubject: Subject<void> = new Subject<void>();
  public onChange: Observable<void> = this.onChangeSubject.asObservable();

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  addToCart(cartItem: CartItem): Observable<void> {
    if (this.authService.isUserAuthenticated()) {
      return this.http.post(`${this.baseUrl}/add`, cartItem)
        .pipe(
          map(() => {
            this.onChangeSubject.next();
          })
        );
    } else {
      return new Observable<void>(observer => {
        this.getCart().subscribe(cart => {
          const sameItem = cart.find(x => x.productId === cartItem.productId && x.productTypeId === cartItem.productTypeId);
          if (sameItem == null) {
            cart.push(cartItem);
          } else {
            sameItem.quantity += cartItem.quantity;
          }
          this.localStorage.store('cart', cart);
          this.onChangeSubject.next();
          observer.next();
          observer.complete();
        });
      });
    }
  }

  private getCart(): Observable<CartItem[]> {
    return this.localStorage.retrieve('cart') || new Observable<CartItem[]>(observer => observer.next([]));
  }

  getCartProducts(): Observable<CartProductResponse[]> {
    if (this.authService.isUserAuthenticated()) {
      return this.http.get<ServiceResponse<CartProductResponse[]>>(this.baseUrl)
        .pipe(
          map(response => response.data || []) // Provide an empty array as the default value if response.data is null
        );
    } else {
      return new Observable<CartProductResponse[]>(observer => {
        const cartItems = this.localStorage.retrieve('cart');
        if (!cartItems) {
          observer.next([]);
          observer.complete();
          return;
        }
        this.http.post<ServiceResponse<CartProductResponse[]>>(`${this.baseUrl}/products`, cartItems)
          .subscribe(response => {
            observer.next(response.data || []); // Provide an empty array as the default value if response.data is null
            observer.complete();
          });
      });
    }
  }

  removeProductFromCart(productId: number, productTypeId: number): Observable<void> {
    if (this.authService.isUserAuthenticated()) {
      return this.http.delete<void>(`${this.baseUrl}/${productId}/${productTypeId}`)
        .pipe(
          map(() => {
            this.onChangeSubject.next();
          })
        );
    } else {
      return new Observable<void>(observer => {
        this.getCart().subscribe(cart => {
          const index = cart.findIndex(x => x.productId === productId && x.productTypeId === productTypeId);
          if (index !== -1) {
            cart.splice(index, 1);
            this.localStorage.store('cart', cart);
            this.onChangeSubject.next();
          }
          observer.next();
          observer.complete();
        });
      });
    }
  }

  updateQuantity(product: CartProductResponse): Observable<void> {
    if (this.authService.isUserAuthenticated()) {
      const request: CartItem = {
        // TODO
        userId: 1,
        productId: product.productId,
        quantity: product.quantity,
        productTypeId: product.productTypeId
      };
      return this.http.put<void>(`${this.baseUrl}/update-quantity`, request)
        .pipe(
          map(() => {
            this.onChangeSubject.next();
          })
        );
    } else {
      return new Observable<void>(observer => {
        this.getCart().subscribe(cart => {
          const cartItem = cart.find(x => x.productId === product.productId && x.productTypeId === product.productTypeId);
          if (cartItem) {
            cartItem.quantity = product.quantity;
            this.localStorage.store('cart', cart);
            this.onChangeSubject.next();
          }
          observer.next();
          observer.complete();
        });
      });
    }
  }

  storeCartItems(emptyLocalCart: boolean): Observable<void> {
    const localCart = this.localStorage.retrieve('cart');
    if (!localCart) {
      return new Observable<void>(observer => observer.next());
    }
    return this.http.post<void>(this.baseUrl, localCart)
      .pipe(
        map(() => {
          if (emptyLocalCart) {
            this.localStorage.clear('cart');
          }
        })
      );
  }

  getCartItemsCount(): Observable<void> {
    if (this.authService.isUserAuthenticated()) {
      return this.http.get<ServiceResponse<number>>(`${this.baseUrl}/count`)
        .pipe(
          map(result => {
            this.localStorage.store('cartItemsCount', result.data);
            return;
          })
        );
    } else {
      return new Observable<void>(observer => {
        this.getCart().subscribe(cart => {
          this.localStorage.store('cartItemsCount', cart ? cart.length : 0);
          observer.next();
          observer.complete();
        });
      });
    }
  }
}
