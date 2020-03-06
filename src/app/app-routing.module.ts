import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditionCVComponent } from './edition-cv/edition-cv.component';


const routes: Routes = [
 // { path : '',component: LoginComponent},
  {
    path: 'home', component: HomeComponent,//canActivateChild:[AuthGuard],
    children: [
      {path: 'cv', component: EditionCVComponent}
   
  ]
}
 // { path : '**', component: ErreurComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
