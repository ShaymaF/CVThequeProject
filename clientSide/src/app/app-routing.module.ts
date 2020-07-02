import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './authentification/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { EditionCv2Component } from './edition-cv/edition-cv2.component';
import { VersionsListComponent } from './versions-cv/versions-list.component';
import { ShowVersionComponent } from './versions-cv/showVersion/show-version/show-version.component';
import { ListTemplateComponent } from './mapping-cv/list-template/list-template.component';
import { NewTemplateComponent } from './mapping-cv/new-template/new-template.component';
import { ListCollabComponent } from './list-collab/list-collab.component';
import { VersionEditComponent } from './versions-cv/version-edit/version-edit.component';
import { ProfilComponent } from './user-profil/profil/profil.component';
import { InfoComponent } from './user-profil/info/info/info.component';
import { AccountComponent } from './user-profil/account/account/account.component';
import { ResetPasswordComponent } from './user-profil/resetPassword/reset-password/reset-password.component';
import { AuthGuardService } from './shared/services/_guards/auth-guard.service';



const routes: Routes = [
  { path : 'login',component: LoginComponent},
  { path : '',component: LoginComponent},


  {
    path: 'home', component: HomeComponent,canActivate: [AuthGuardService] ,
    children: [

      {path: 'edit', component: EditionCv2Component},

      {path: 'version-list', component: VersionsListComponent},
      {path: 'versions/:id', component: ShowVersionComponent},
            
      {path: 'templates', component: ListTemplateComponent,children:
    [
      {path: 'new/', component: NewTemplateComponent},

    ]},

      
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
