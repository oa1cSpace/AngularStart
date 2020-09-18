import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../store/models/user.model";

export interface AuthResponse {
  user: User;
  expiresIn: string;
}

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  get token(): string {

    return localStorage.getItem('token');
  }

  public logout() {
    this.setToken(null);
  }

  private setToken(response: AuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('auth-token', response.user.token);
      localStorage.setItem('auth-token-exp', expDate.toString());
    } else {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-token-exp');
    }
  }

  public getTodos(): Observable<any> {

    return this.http.get(
      'http://localhost:3000/tasks',
    );
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
}
