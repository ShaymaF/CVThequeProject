import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/auth";

import { TokenStorageService } from '../token-storage/token-storage.service';

//const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const TOKEN_HEADER_KEY = 'x-access-token';   // for Node.js Express back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,private angularFireAuth: AngularFireAuth) {
   }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      // for Spring Boot back-end
     // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
       authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    console.log('token from interceptor',token);
       this.angularFireAuth.auth.signInWithCustomToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU4OTI2Njk4MCwiZXhwIjoxNTg5MjcwNTgwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay16Mm94ekBjdnRoZXF1ZXBmZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXoyb3h6QGN2dGhlcXVlcGZlLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoic2hheW1hRnJhZGkiLCJjbGFpbXMiOnsicm9sZSI6IlJIIiwicGFzc3dvcmQiOiIyMDIwIn19.LgCPhaEOcqziZJkMsahATnF7JY9eut2TFSewS6a5aGc4wuT6ltRTJLz1XNLJDsX1R-gql6Y3HrmOK4tXVZatfOWJFLhU-SqyuaPeU0j7X4k5sUzuQTj0PrVP8CH8rpAt66qwJXKjTUUbQOKpJIsAX4ez5MtEpTwxdj8GimOoOVswp89KGFSG3ZdPVVTK9cPCcEb526hCirZolfTSGGcDQm8pJG8u0ypj9n-m8hXqledWKmeLve5ms0N2sVCpSv0X2Uy9B--sR8f5Mad3iOyXu5TD9qUV-HW77Mky10Q-00hb-i1QNWeVNhFzCZcR647yA4pt1IIRd0Z_opnXkNZ4pw').then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];