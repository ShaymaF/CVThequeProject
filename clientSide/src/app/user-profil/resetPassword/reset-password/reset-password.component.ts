import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/_auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthService,private toastr: ToastrService) { }

  ngOnInit() {
  }
 resetPassword(passwordOld,passwordNew,passwordNew2){
   // extract userId from token
   let userId="shaymaFradi";
   if(passwordNew==passwordNew2)
   {
    this.authService.updatePassword(userId,passwordOld,passwordNew).subscribe(
      data => {
        console.log(data);
        if(data.success==false){
          this.toastr.error(data.message);
        }
          else if(data.success==true){
            this.toastr.success(data.message);

          }
        
      },
      err => {
        this.toastr.error('Changing password failed with error: ', err);


      }
    );
   }
   else if (passwordNew!=passwordNew2){
    this.toastr.error('Verified password don'+ "'"+'t match');


   }
 }
}
