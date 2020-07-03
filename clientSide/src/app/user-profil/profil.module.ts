import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { ProfilComponent } from './profil/profil.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './info/info/info.component';
import { AccountComponent } from './account/account/account.component';
import { ResetPasswordComponent } from './resetPassword/reset-password/reset-password.component';



@NgModule({
  declarations: [ProfilComponent, InfoComponent, AccountComponent, ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule ,
    
  ]
})
export class ProfilModule { }
