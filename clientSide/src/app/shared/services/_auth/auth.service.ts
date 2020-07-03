import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../token-storage/token-storage.service';

const AUTH_API = 'http://localhost:8080/ldap/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  constructor(private http: HttpClient,private angularFireAuth: AngularFireAuth,public jwtHelper: JwtHelperService,
    private tokenStorage: TokenStorageService) {
    this.userData = angularFireAuth.authState;
  }

  login(credentials): Observable<any> {
   
      
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
   
  }

  updatePassword(userId,passwordOld,passwordNew): Observable<any> {
   
      
    return this.http.post(AUTH_API + 'updatePassword', {
      userId: userId,
      passwordOld: passwordOld,
      passwordNew: passwordNew 

    }, httpOptions);
   
  }
  public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  signOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();

  }
 /* register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }*/
}