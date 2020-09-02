import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from 'src/app/common/user'

const login = 'http://localhost:8080/api/login';
const signUp = 'http://localhost:8080/users/sign-up';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(login, User, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(signUp, User, httpOptions);
  }
}