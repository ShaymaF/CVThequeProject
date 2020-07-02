import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { AboutService } from './services/about/about.service';
import { FormationService } from './services/formation/formation.service';
import { FooterComponent } from './home/footer/footer.component';
import { HeaderComponent } from './home/header/header.component';
import { ContentComponent } from './home/content/content.component';
import { HomeComponent } from './home/home.component';
import { CompetenceService } from './services/competence/competence.service';
import { ContactService } from './services/contact/contact.service';
import { DiversService } from './services/divers/divers.service';
import { ExperienceService } from './services/experience/experience.service';
import { LoisirService } from './services/loisirs/loisir.service';
import { PersonService } from './services/person/person.service';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { DemoNumberPipe } from './pipes/demo-number/demo-number.pipe';

import {MatButtonModule} from '@angular/material/button';
import {FileUploadModule, FileUploader} from 'ng2-file-upload';
import  {TranslatePipe} from './pipes/translate/translate.pipe';
import { SearchPipe } from './pipes/search/search.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {MatDatepickerModule,MatNativeDateModule,MatFormFieldModule, MatSelectModule,MatInputModule, MatIconModule} from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TokenStorageService } from './services/token-storage/token-storage.service';
import { authInterceptorProviders } from './services/_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { AuthGuardService } from './services/_guards/auth-guard.service';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ContentComponent,
    HomeComponent,
    SafeHtmlPipe,
    SearchPipe,
    DemoNumberPipe,
    TranslatePipe,
  ],
  imports: [
     CommonModule,
     FormsModule,
     AppRoutingModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     DragDropModule,
     CKEditorModule,
     Ng2SearchPipeModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatFormFieldModule,  
     MatSelectModule,
     MatInputModule,
     MatIconModule,
     MatButtonModule,
     FileUploadModule,
     ToastrModule.forRoot() ,
    
  ],
  exports:[
    SafeHtmlPipe,
    SearchPipe,
    DemoNumberPipe,
    TranslatePipe,
    Ng2SearchPipeModule,
    CKEditorModule,
    DragDropModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ {
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
        PersonService,
        TokenStorageService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        AuthGuardService,
       authInterceptorProviders ]
    };
  }
}