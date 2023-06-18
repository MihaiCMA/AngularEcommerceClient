import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { Product } from './model/product';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  // other routes
  { path: '', component: FeaturedProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: ':categoryUrl', component: ProductListComponent }

  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
