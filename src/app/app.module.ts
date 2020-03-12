import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatDatepickerModule,MatNativeDateModule,MatFormFieldModule} from '@angular/material';
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
import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    HomeComponent,
    EditionCVComponent,
    FileSelectDirective
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
       ToastrModule.forRoot() 
    
  ],
  providers: [
    AboutService,
    FormationService,
    CompetenceService,
    ContactService,
    DiversService,
    ExperienceService,
    LoisirService,
    PersonService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
