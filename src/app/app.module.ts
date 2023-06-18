import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';

import { HttpClientModule } from '@angular/common/http';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ShopNavMenuComponent } from './components/shop-nav-menu/shop-nav-menu.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { CartCounterComponent } from './components/cart-counter/cart-counter.component';
import { SearchComponent } from './components/search/search.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserButtonComponent,
    LoginComponent,
    ShopNavMenuComponent,
    HomeButtonComponent,
    CartCounterComponent,
    SearchComponent,
    FeaturedProductsComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductService,
    LocalStorageService], // Add ProductService as a provider
  bootstrap: [AppComponent]
})
export class AppModule { }
