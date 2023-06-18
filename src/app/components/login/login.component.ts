import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  errorMessage = '';

  returnUrl = '';

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async handleLogin() {
    this.authService.login(this.user).pipe(
      switchMap(result => {
        if (result.success) {
          this.errorMessage = '';
  
          return this.localStorage.store('authToken', result.data);
        } else {
          this.errorMessage = result.message;
          return [];
        }
      })
    ).subscribe(() => {
      this.cartService.storeCartItems(true)
        .pipe(switchMap(() => this.cartService.getCartItemsCount()))
        .subscribe(() => {
          this.router.navigateByUrl(this.returnUrl);
        });
    });
  }
}
