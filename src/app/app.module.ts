import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatDatepickerModule,MatNativeDateModule,MatFormFieldModule, MatSelectModule,MatInputModule, MatIconModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AboutService } from './services/about/about.service';
import { FormationService } from './services/formation/formation.service';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { ContentComponent } from './home/content/content.component';
import { HomeComponent } from './home/home.component';
import { EditionCVComponent } from './edition-cv/edition-cv.component';
import { CompetenceService } from './services/competence/competence.service';
import { ContactService } from './services/contact/contact.service';
import { DiversService } from './services/divers/divers.service';
import { ExperienceService } from './services/experience/experience.service';
import { LoisirService } from './services/loisirs/loisir.service';
import { PersonService } from './services/person/person.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './safe-html.pipe';
import { ShowVersionComponent } from './versions/show-version/show-version.component';
import { ListVersionsComponent } from './versions/list-versions/list-versions.component';
import { VersionsListComponent } from './versions-list/versions-list.component';
import {MatButtonModule} from '@angular/material/button';
import {FileUploadModule, FileUploader} from 'ng2-file-upload';
import { ListCollabComponent } from './list-collab/list-collab.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import {AngularFireModule} from "@angular/fire";
import { AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireDatabaseModule} from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from 'src/environments/environment';
import { VersionEditComponent } from './versions-list/version-edit/version-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { TokenStorageService } from './services/token-storage/token-storage.service';
import { authInterceptorProviders } from './services/_helpers/auth.interceptor';
import { EditionCv2Component } from './edition-cv2/edition-cv2.component';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    HomeComponent,
    EditionCVComponent,
    SafeHtmlPipe,
    ShowVersionComponent,
    ListVersionsComponent,
    VersionsListComponent,
    ListCollabComponent,
    SearchPipe,
    VersionEditComponent,
    LoginComponent,
    EditionCv2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   CKEditorModule,
    FormsModule,
    MatDatepickerModule,
     MatNativeDateModule,
     MatFormFieldModule,  
       HttpClientModule,
       CommonModule,
       BrowserAnimationsModule,
       ToastrModule.forRoot() ,
MatSelectModule,
MatInputModule,
ReactiveFormsModule,
MatIconModule,
MatButtonModule,FileUploadModule,
AngularFireAuthModule,
AngularFireModule.initializeApp(environment.firebase),
AngularFireStorageModule,
AngularFireDatabaseModule



    
  ],
  providers: [{
    provide: FileUploader,
    useClass:FileUploader,
    deps:[] },
    AboutService,
    FormationService,
    CompetenceService,
    ContactService,
    DiversService,
    ExperienceService,
    LoisirService,
    PersonService,TokenStorageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
