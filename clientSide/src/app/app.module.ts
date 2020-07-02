import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProfilModule } from './user-profil/profil.module';
import { MappingModule } from './mapping-cv/mapping.module';
import { AuthModule } from './authentification/auth.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from "@angular/fire";
import { AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireDatabaseModule} from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { authInterceptorProviders } from './shared/services/_helpers/auth.interceptor';
import { ShowVersionComponent } from './versions-cv/showVersion/show-version/show-version.component';
import { EditionCv2Component } from './edition-cv/edition-cv2.component';
import { ListCollabComponent } from './list-collab/list-collab.component';
import { VersionsListComponent } from './versions-cv/versions-list.component';
import { VersionEditComponent } from './versions-cv/version-edit/version-edit.component';


@NgModule({
  declarations: [
    AppComponent,
  
    EditionCv2Component,
    VersionsListComponent,
    ListCollabComponent,
    VersionEditComponent,
    
    EditionCv2Component,
    ShowVersionComponent
    
  ],
  imports: [
    SharedModule.forRoot(),
    ProfilModule,
    MappingModule,
    AuthModule,
    BrowserModule.withServerTransition({ appId: 'CvTheque' }),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

       


AngularFireAuthModule,
AngularFireModule.initializeApp(environment.firebase),
AngularFireStorageModule,
AngularFireDatabaseModule,
    
  ],
  providers: [
   authInterceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

