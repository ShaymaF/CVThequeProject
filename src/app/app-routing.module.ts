import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditionCVComponent } from './edition-cv/edition-cv.component';
import { ListVersionsComponent } from './versions/list-versions/list-versions.component';
import { ShowVersionComponent } from './versions/show-version/show-version.component';


const routes: Routes = [
 // { path : '',component: LoginComponent},
  {
    path: 'home', component: HomeComponent,//canActivateChild:[AuthGuard],
    children: [
      {path: 'cv', component: EditionCVComponent},
      {path: 'listVersion', component: ListVersionsComponent},
      {path: 'showVersion', component: ShowVersionComponent}
   
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
