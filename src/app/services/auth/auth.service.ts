import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from 'src/app/common/user'

const login = 'http://localhost:8080/users/login';
const signUp = 'http://localhost:8080/users/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(login, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(signUp, user);
  }
}