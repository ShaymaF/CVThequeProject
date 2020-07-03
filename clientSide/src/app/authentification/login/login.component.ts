import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/_auth/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //save token in session storage
        this.tokenStorage.saveToken(data.token);
        //recupere user roles from saved token
        this.roles = this.tokenStorage.getUser().roles;
        //navigate to the first page
        this.router.navigateByUrl('home/collab-list');
       //decode token and save user in session storage
        var decoded = jwt_decode(this.tokenStorage.getToken());
         this.tokenStorage.saveUser(decoded.uid);
        console.log(decoded);   
       
        console.log('role',this.roles);


  
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  //reloadPage() {
  //  window.location.reload();
  
}