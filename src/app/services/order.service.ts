import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router as NavigationManager}  from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, defaultIfEmpty  } from 'rxjs/operators';   
import { ServiceResponse } from '../model/serviceResponse';
import { OrderDetailsResponse } from '../model/orderDetailsResponse';
import { OrderOverviewResponse } from '../model/orderOverviewResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private navigationManager: NavigationManager,
    private authService : AuthService
  ) {}

  getOrderDetails(orderId: number): Observable<OrderDetailsResponse> {
    return this.http.get<ServiceResponse<OrderDetailsResponse>>(`api/order/${orderId}`)
      .pipe(
        filter(result => result !== null), // Filter out null responses
        map(result => result.data as OrderDetailsResponse) // Cast the data to OrderDetailsResponse
      );
  }
  


  getOrders(): Observable<OrderOverviewResponse[]> {
    return this.http.get<ServiceResponse<OrderOverviewResponse[]>>('api/order')
      .pipe(
        map(result => result.data || []), // Use logical OR operator to return an empty array if the data is null
        defaultIfEmpty([]) // Set a default value of an empty array if the observable is empty
      );
  }

  async placeOrder(): Promise<string> {
    if (await this.authService.isUserAuthenticated()) {
      const result = await this.http.post('api/payment/checkout', null, { responseType: 'text' }).toPromise();
      return result as string;
    } else {
      return 'login' as string;
    }
  }
}
