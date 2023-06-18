import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceResponse } from '../model/serviceResponse';
import { Category } from '../model/category';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl: string = `${environment.hostUrl}/api/category`;
  private categories: Category[] = [];
  private adminCategories: Category[] = [];
  private onChange: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  get Categories(): Category[] {
    return this.categories;
  }

  get AdminCategories(): Category[] {
    return this.adminCategories;
  }

  get OnChange(): Observable<void> {
    return this.onChange.asObservable();
  }

  addCategory(category: Category): Observable<void> {
    return this.http.post<ServiceResponse<Category[]>>(this.baseUrl+'/admin', category)
      .pipe(
        map(response => {
          this.adminCategories = response.data || []; // Provide an empty array as the default value if response.data is null
          this.getCategories();
          this.notifyChange();
        })
      );
  }
  

  createNewCategory(): Category {
    const newCategory: Category = {
      id: 0,
      name: '',
      url: '',
      visible: true,
      deleted: false,
      isNew: true,
      editing: true
    };
  
    this.adminCategories.push(newCategory);
    this.notifyChange();
    return newCategory;
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<ServiceResponse<Category[]>>(`api/Category/admin/${categoryId}`)
      .pipe(
        map(response => {
          if (response.data !== null) {
            this.adminCategories = response.data;
          } else {
            this.adminCategories = []; // Assign an empty array if the response data is null
          }
          this.getCategories();
          this.notifyChange();
        })
      );
  }
  

  getAdminCategories(): Observable<void> {
    return this.http.get<ServiceResponse<Category[]>>('api/Category/admin')
      .pipe(
        map(response => {
          if (response && response.data) {
            this.adminCategories = response.data;
          }
        })
      );
  }

  getCategories(): Observable<void> {
    return this.http.get<ServiceResponse<Category[]>>(this.baseUrl)
      .pipe(
        map(response => {
          if (response && response.data) {
            this.categories = response.data;
          }
        })
      );
  }

  updateCategory(category: Category): Observable<void> {
    return this.http.put<ServiceResponse<Category[]>>('api/Category/admin', category)
      .pipe(
        map(response => {
          if (response.data !== null) {
            this.adminCategories = response.data;
          } else {
            this.adminCategories = []; // Assign an empty array if the response data is null
          }
          this.getCategories();
          this.notifyChange();
        })
      );
  }
  

  private notifyChange(): void {
    this.onChange.next();
  }
}
