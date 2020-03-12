import { Component, OnInit ,EventEmitter, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { AboutService } from '../services/about/about.service';
import { FormationService } from '../services/formation/formation.service';
import { Formation } from '../models/formation';
import { Experience } from '../models/experience';

import { ContactService } from '../services/contact/contact.service';
import { ExperienceService } from '../services/experience/experience.service';

import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { LanguesService } from '../services/langues/langues.service';
import { Langue } from '../models/langues';
import { Loisirs } from '../models/loisirs';
import { Divers } from '../models/divers';
import { LoisirService } from '../services/loisirs/loisir.service';
import { DiversService } from '../services/divers/divers.service';
import { CertificatService } from '../services/Certificat/certificat.service';
import { Certificat } from '../models/certificat';
const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-edition-cv',
  templateUrl: './edition-cv.component.html',
  styleUrls: ['./edition-cv.component.css']
})

export class EditionCVComponent implements OnInit {
  localUrl: any[];
  objectKeys :any;
  abouts:any;
  formations:any;
  contacts:any;
  listExperiences: Experience[];
  listLangues: Langue[];
  listLoisirs: Loisirs[];
  listDivers: Divers[];
  listFormation: Formation[];
  listCertif: Certificat[];

  emps: Experience[] = [];
  arrayListExp = [];
  arrayListLang=[];
  arrayListDivers=[];
  arrayListLoisirs=[];
  arrayListFormation=[];
  arrayListCertif=[];

  url:any;
  urlExist: boolean=false;
  public Editor = DecoupledEditor;

  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }
public destroyEditor(editor){
  editor.destroy();
}
public uploader: FileUploader = new FileUploader({
  url: URL,
  itemAlias: 'image',


});
constructor(private aboutService :AboutService, private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService,
  private toastr: ToastrService, private langueService :LanguesService
  , private diversService : DiversService, private loisirsService :LoisirService,
  private certificatService : CertificatService
  ){
    this.getAllAbouts();
    this.getAllContacts();
    this.getAllExperiences();
    this.getAllLangues();
    this.getAllDivers();
    this.getAllLoisirs();
   this.getAllFormation();
   this.getAllCertificats();

}
ngOnInit() {
  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;
    this.urlExist=true;
    this.url=file.url+'/'+file._file.name;

    console.log('filename',file.url);
  };
  this.uploader.onCompleteItem = (item: any, status: any) => {
    console.log('Uploaded File Details:', item._file.filename);

    this.toastr.success('File successfully uploaded!');
  };
}
getAllAbouts() {
  this.aboutService.getAbout().subscribe(data => {
   this.abouts= data;
});
}
getAllContacts() {
  this.contactService.getContacts().subscribe(data => {
   this.contacts= data;
});
}
getAllLangues() {
  this.langueService.getLangues().subscribe((data: Langue[]) => {
    this.listLangues = data;
for(let key in this.listLangues){
 if(this.listLangues.hasOwnProperty(key)){
  this.arrayListLang.push(this.listLangues[key]);

}
}
  });  
}
getAllLoisirs() {
  this.loisirsService.getLoisirs().subscribe((data: Loisirs[]) => {
    this.listLoisirs = data;
for(let key in this.listLoisirs){
 if(this.listLoisirs.hasOwnProperty(key)){
  this.arrayListLoisirs.push(this.listLoisirs[key]);

}
}
  });  
}
getAllDivers() {
  this.diversService.getDivers().subscribe((data: Loisirs[]) => {
    this.listDivers = data;
for(let key in this.listDivers){
 if(this.listDivers.hasOwnProperty(key)){
  this.arrayListDivers.push(this.listDivers[key]);

}
}
  });  
}

getAllCertificats() {
  this.certificatService.getFormation().subscribe((data: Certificat[]) => {
    this.listCertif = data;
for(let key in this.listCertif){
 if(this.listCertif.hasOwnProperty(key)){
  this.arrayListCertif.push(this.listCertif[key]);

}
}
  });  
}
getAllExperiences() {
  this.experienceService.getExperience().subscribe((data: Experience[]) => {
    this.listExperiences = data;
 //    this.objectKeys = this.listExperiences.keys;
//console.log('keys',this.listExperiences.keys);

for(let key in this.listExperiences){
 if(this.listExperiences.hasOwnProperty(key)){
  this.arrayListExp.push(this.listExperiences[key]);

 }
}

console.log('array',this.arrayListExp);
      console.log('exp ',this.listExperiences);
  });  
}
getAllFormation() {
  this.formationService.getFormation().subscribe((data: Formation[]) => {
    this.listFormation = data;
for(let key in this.listFormation){
 if(this.listFormation.hasOwnProperty(key)){
  this.arrayListFormation.push(this.listFormation[key]);

}
}
  });  
}
showPreviewImage(event: any) {
  if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
  }
}
}