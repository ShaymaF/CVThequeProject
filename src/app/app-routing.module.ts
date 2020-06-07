import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditionCVComponent } from './edition-cv/edition-cv.component';
import { ListVersionsComponent } from './versions/list-versions/list-versions.component';
import { ShowVersionComponent } from './versions/show-version/show-version.component';
import { VersionsListComponent } from './versions-list/versions-list.component';
import { ListCollabComponent } from './list-collab/list-collab.component';
import { VersionEditComponent } from './versions-list/version-edit/version-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { EditionCv2Component } from './edition-cv2/edition-cv2.component';
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil/profil.component';
import { InfoComponent } from './profil/info/info/info.component';
import { AccountComponent } from './profil/account/account/account.component';
import { ResetPasswordComponent } from './profil/resetPassword/reset-password/reset-password.component';


const routes: Routes = [
  { path : '',component: LoginComponent},
  { path : 'error',component: AppComponent},

  {
    path: 'home', component: HomeComponent,//canActivateChild:[AuthGuard],
    children: [
      {path: 'cv-temp1', component: EditionCVComponent},

      {path: 'cv-temp2', component: EditionCv2Component},

      {path: 'version-list', component: VersionsListComponent},
      {path: 'collab-list', component:ListCollabComponent},
      {path: 'version-edit/:id', component:VersionEditComponent},
      {path: 'profil', component:ProfilComponent,

children: [
  {path: 'info', component: InfoComponent},
  {path: 'account', component: AccountComponent},
  {path: 'reset', component: ResetPasswordComponent},
  {path: '', component: InfoComponent},


]}
      

   
  ]
  
},
{path: 'cv', component: EditionCv2Component},
{path: 'profil', component:ProfilComponent,

children: [
  {path: 'info', component: InfoComponent},
  {path: 'account', component: AccountComponent},
  {path: 'reset', component: ResetPasswordComponent},


]}
 // { path : '**', component: ErreurComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
