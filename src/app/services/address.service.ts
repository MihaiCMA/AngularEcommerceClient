import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../model/address';

import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly baseUrl: string = `${environment.hostUrl}/api/address`;
  constructor(private http: HttpClient) {}

  addOrUpdateAddress(address: Address): Observable<Address> {
    return this.http.post<ServiceResponse<Address>>('api/address', address)
      .pipe(
        map(response => response.data)
      );
  }

  getAddress(): Observable<Address> {
    return this.http.get<ServiceResponse<Address>>('api/address')
      .pipe(
        map(response => response.data)
      );
  }
}

interface ServiceResponse<T> {
  data: T;
}