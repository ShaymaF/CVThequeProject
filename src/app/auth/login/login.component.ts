import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/_auth/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
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
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        //console.log('data'+data+'token'+data.token+'roles'+this.tokenStorage.getUser());
        var decoded = jwt_decode(this.tokenStorage.getToken());
         this.tokenStorage.saveUser(decoded.uid);
        console.log(decoded);   
        if(decoded.claims.role=="RH"){
          this.router.navigateByUrl('/collab-list');

        }
        if(decoded.claims.role=="MANAGER"){
          
        }
        if(decoded.claims.role=="COMMERCIAL"){
          this.router.navigateByUrl('/collab-list');

        }
        if(decoded.claims.role=="GUEST"){
        //  this.router.navigateByUrl('/collab-list');

        }

    //  this.reloadPage();
	  console.log('auth-token',this.tokenStorage.getToken());
    //collab-list
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