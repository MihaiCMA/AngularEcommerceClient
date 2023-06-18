import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';

import { HttpClientModule } from '@angular/common/http';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { LocalStorageService } from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    UserButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService,
    LocalStorageService], // Add ProductService as a provider
  bootstrap: [AppComponent]
})
export class AppModule { }
