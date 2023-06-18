import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceResponse } from '../model/serviceResponse';
import { ProductType } from '../model/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  public productTypes: ProductType[] = [];

  constructor(private http: HttpClient) {}

  public addProductType(productType: ProductType): Observable<void> {
    return this.http.post<ServiceResponse<ProductType[]>>('api/producttype', productType)
      .pipe(
        map(response => {
          if (response.data !== null) {
            this.productTypes = response.data;
          } else {
            this.productTypes = []; // Assign an empty array if the response data is null
          }
        })
      );
  }

  public createNewProductType(): ProductType {
    const newProductType: ProductType = { id: 0, name: '', isNew: true, editing: true };
  
    this.productTypes.push(newProductType);
    return newProductType;
  }

  public getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ServiceResponse<ProductType[]>>('api/producttype')
      .pipe(
        map(response => {
          if (response.data !== null) {
            this.productTypes = response.data;
            return response.data;
          } else {
            return [];
          }
        })
      );
  }

  public updateProductType(productType: ProductType): Observable<void> {
    return this.http.put<ServiceResponse<ProductType[]>>('api/producttype', productType)
      .pipe(
        map(response => {
          if (response.data !== null) {
            this.productTypes = response.data;
          }
        })
      );
  }
  
}
