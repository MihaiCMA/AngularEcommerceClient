import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css']
})
export class UserButtonComponent {
  isLoggedIn: boolean = false;
  showUserMenu: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  createRelativeUrl(): string {
    const returnUrl = this.router.createUrlTree([], { queryParamsHandling: 'preserve', relativeTo: this.router.routerState.root });
    return returnUrl.toString();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  hideUserMenu(): void {
    setTimeout(() => {
      this.showUserMenu = false;
    }, 200);
  }

  async logout(): Promise<void> {
    await localStorage.removeItem("authToken");
    await this.cartService.getCartItemsCount();
    await this.router.navigate(['']);
  }
}
