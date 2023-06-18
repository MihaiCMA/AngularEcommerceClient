import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductSearchResult } from 'src/app/model/productSearchResult';
import { ServiceResponse } from 'src/app/model/serviceResponse';
import { environment } from 'src/environments';

@Injectable()
export class ProductService {
  private readonly baseUrl: string = `${environment.hostUrl}/api/product`;
  private productsChangedSubject: Subject<void> = new Subject<void>();
  public products: Product[] = [];
  public message: string = "Loading products...";
  public currentPage: number = 1;
  public pageCount: number = 0;
  public lastSearchText: string = '';

  constructor(private http: HttpClient) {}

  get productsChanged(): Observable<void> {
    return this.productsChangedSubject.asObservable();
  }

  private notifyProductsChanged(): void {
    this.productsChangedSubject.next();
  }

  subscribeToProductChanges(): void {
    // Perform any additional logic if needed
    // For example, you could start a timer or initiate polling
    // to check for product updates periodically
    this.notifyProductsChanged();
  }

  unsubscribeFromProductChanges(): void {
    // Perform any cleanup logic if needed
    // For example, you could stop the timer or cancel the polling
  }

  createProduct(product: Product): Observable<ServiceResponse<Product>> {
    product.variants.forEach((variant) => {
      variant.productType = null;
    });
    return this.http.post<ServiceResponse<Product>>(
      `${this.baseUrl}/create`,
      product
    );
  }

  deleteProduct(productId: number): Observable<ServiceResponse<boolean>> {
    return this.http.delete<ServiceResponse<boolean>>(
      `${this.baseUrl}/delete/${productId}`
    );
  }

  getAdminProducts(): Observable<ServiceResponse<Product[]>> {
    return this.http
      .get<ServiceResponse<Product[]>>(`${this.baseUrl}/admin`)
      .pipe(
        map((response) => {
          response.data = response.data?.filter(
            (product) => !product.deleted
          ) ?? null;
          return response;
        })
      );
  }

  getFeaturedProducts(): Observable<ServiceResponse<Product[]>> {
    return this.http
      .get<ServiceResponse<Product[]>>(`${this.baseUrl}/featured`)
      .pipe(
        map((response) => {
          response.data = response.data?.filter(
            (product) =>
              product.featured && product.visible && !product.deleted
          ) ?? null;
          return response;
        })
      );
  }

  getProduct(productId: number): Observable<ServiceResponse<Product>> {
    return this.http.get<ServiceResponse<Product>>(
      `${this.baseUrl}/${productId}`
    );
  }

  getProducts(): Observable<ServiceResponse<Product[]>> {
    return this.http
      .get<ServiceResponse<Product[]>>(`${this.baseUrl}`)
      .pipe(
        map((response) => {
          response.data = response.data?.filter(
            (product) => product.visible && !product.deleted
          ) ?? null;
          return response;
        })
      );
  }

  getProductsByCategory(
    categoryUrl: string
  ): Observable<ServiceResponse<Product[]>> {
    return this.http
      .get<ServiceResponse<Product[]>>(
        `${this.baseUrl}/category/${categoryUrl}`
      );
  }

  getProductSearchSuggestions(
    searchText: string
  ): Observable<ServiceResponse<string[]>> {
    return this.http
      .get<ServiceResponse<ProductSearchResult>>(
        `${this.baseUrl}/search/suggestions/${searchText}`
      )
      .pipe(
        map((response) => {
          const result: string[] = [];
          const products = response.data?.products;

          if (products) {
            for (const product of products) {
              if (
                product.title.toLowerCase().includes(searchText.toLowerCase())
              ) {
                result.push(product.title);
              }

              if (product.description != null) {
                const punctuation = Array.from(
                  new Set(
                    product.description
                      .split('')
                      .filter((char) => char.match(/[^\w\s]/))
                  )
                );
                const words = product.description
                  .split(' ')
                  .map((word) =>
                    word.replace(
                      new RegExp(punctuation.join('|'), 'g'),
                      ''
                    )
                  );

                for (const word of words) {
                  if (
                    word.toLowerCase().includes(searchText.toLowerCase()) &&
                    !result.includes(word)
                  ) {
                    result.push(word);
                  }
                }
              }
            }
          }

          return {
            success: true,
            message: '',
            data: result,
          };
        })
      );
  }

  searchProducts(
    searchText: string,
    page: number
  ): Observable<ServiceResponse<ProductSearchResult>> {
    const pageResults = 2;
    return this.http.get<ServiceResponse<ProductSearchResult>>(
      `${this.baseUrl}/search/${searchText}?page=${page}&results=${pageResults}`
    );
  }

  updateProduct(product: Product): Observable<ServiceResponse<Product>> {
    return this.http.put<ServiceResponse<Product>>(
      `${this.baseUrl}/update/${product.id}`,
      product
    );
  }
}
