import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceResponse } from '../model/serviceResponse';
import { UserChangePassword } from '../model/userChangePassword';;
import { UserLogin } from '../model/userLogin';;
import { UserRegister } from '../model/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = '/api/auth';

  constructor(private http: HttpClient) {}

  public changePassword(request: UserChangePassword): Observable<ServiceResponse<boolean>> {
    return this.http.post<ServiceResponse<boolean>>(`${this.baseUrl}/change-password`, request.password);
  }

  public isUserAuthenticated(): Observable<boolean> {
    return this.http.get<ServiceResponse<boolean>>(`${this.baseUrl}/is-authenticated`)
      .pipe(
        map(response => response.data || false)
      );
  }

  public login(request: UserLogin): Observable<ServiceResponse<string>> {
    return this.http.post<ServiceResponse<string>>(`${this.baseUrl}/login`, request);
  }

  public register(request: UserRegister): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.baseUrl}/register`, request);
  }
}
