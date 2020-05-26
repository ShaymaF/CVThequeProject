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


const routes: Routes = [
  { path : '',component: LoginComponent},
  {
    path: 'home', component: HomeComponent,//canActivateChild:[AuthGuard],
    children: [
      {path: 'cv-temp1', component: EditionCVComponent},

      {path: 'cv-temp2', component: EditionCv2Component},

      {path: 'version-list', component: VersionsListComponent},
      {path: 'collab-list', component:ListCollabComponent},
      {path: 'version-edit/:id', component:VersionEditComponent}

   
  ]
  
},
{path: 'cv', component: EditionCv2Component},

 // { path : '**', component: ErreurComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
