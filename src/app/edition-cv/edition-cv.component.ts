import { Component, OnInit ,EventEmitter, Input,ElementRef,ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NativeDateAdapter } from '@angular/material';
import { MatDateFormats, MAT_DATE_LOCALE } from '@angular/material/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { AboutService } from '../services/about/about.service';
import { FormationService } from '../services/formation/formation.service';
import { Formation } from '../models/formation';
import { Experience, Projet } from '../models/experience';

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
import { Competence } from '../models/competence';
import { CompetenceService } from '../services/competence/competence.service';
import { VersionService } from '../services/version/version.service';
import { Version } from '../models/version';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl} from '@angular/forms';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { ChartColors } from '../models/ChartColor';

//const URL = 'http://localhost:8080/upload';
const uploadAPI = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-edition-cv',
  templateUrl: './edition-cv.component.html',
  styleUrls: ['./edition-cv.component.css']
 
})



export class EditionCVComponent  implements OnInit {
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());
  dataCurrentArray:ChartColors;
  dataUndoArray: Array<ChartColors> = [];
  dataRedoArray: Array<ChartColors> = [];
  undoLimit: number = 20;
  showUndo:boolean = false;
  showRedo:boolean = false;

  @ViewChild('editor', {static: false})
  editorComponent: CKEditorComponent;
  ckeConfig: any;
  public imagePath;
  imgURL: any;
   FirstColorInit: string;
   SecondColorInit:string;
Short_Desc:boolean=true;
Long_Desc:boolean=false;

  public chartColor : ChartColors[];
  public message: string;
  localUrl: any[];
  objectKeys :any;
  abouts:any;
  formations:any;
  contacts:any;
  listExperiences: any[];
  listProjet: Projet[];
  listLangues: Langue[];
  listLoisirs: Loisirs[];
  listDivers: Divers[];
  listFormation: Formation[];
  listCertif: Certificat[];
  listComp: Competence[];
  HtmlContent: any;
  ColorVersion:ChartColors;
  AboutVersion:any;
  exp: Experience;
  arrayListExp :Experience[] = [];
  arrayListProjet=[];
  arrayListLang=[];
  arrayListDivers=[];
  arrayListLoisirs=[];
  arrayListFormation=[];
  arrayListCertif=[];
  arrayListComp=[];
  version: Version;
  public backgroundColor: string;
  public fontColor: string;
  public linkColor: string;

  url:any;
  urlExist: boolean=false;
  toppings = new FormControl();
  public Editor = InlineEditor;
  ExperienceData: any;

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
 myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  public onReady( editor ) {
  
    editor.ui.editor.config.extraAllowedContent = 'div(*)';
    editor.ui.editor.config.AllowedContent = true;

       editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }
public destroyEditor(editor){
  editor.destroy();
}
/*public uploader: FileUploader = new FileUploader({
  url: URL,
  itemAlias: 'image',


});*/
constructor(private aboutService :AboutService, private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService,
  private toastr: ToastrService, private langueService :LanguesService
  , private diversService : DiversService, private loisirsService :LoisirService,
  private certificatService : CertificatService, private competenceService : CompetenceService,
  private serviceVersion: VersionService,
  
  private el: ElementRef
  ){

    this.FirstColorInit='#008b8b';
    this.SecondColorInit='#017777';
   this.dataCurrentArray={FirstColor:'#008b8b', SecondColor: '#017777'};
    console.log('cc',this.dataCurrentArray);
    this.chartColor=[
      
      {FirstColor: '#008b8b', SecondColor: '#017777'},
      {FirstColor: '#f0ca68', SecondColor: '#b88709'},
      {FirstColor: '#62382f', SecondColor: '#4d261e'},
      {FirstColor: '#c97545', SecondColor: '#8c451c'},
      {FirstColor: '#c1800b', SecondColor: '#805406'},

      
  ];
   // var editor1=this.Editor.replace('Editor');
    //editor1.config.allowedContent = true;
    //DecoupledEditor.replace('Editor', { extraAllowedContent: '*(*)' });

    console.log('ltest',this.arrayListExp);

    this.getAllAbouts();
   
    this.getAllContacts();
    this.getAllExperiences();
    this.getAllLangues();
    this.getAllDivers();
    this.getAllLoisirs();
   this.getAllFormation();
   this.getAllCertificats();
   this.getAllCompetence();
this.getAllProjects();

}
/*ngOnInit() {
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
}*/
updateVariables(){
  console.log('eee',this.ExperienceData);

  if(document.getElementById("ExpDynamicContent") != null){
    this.ExperienceData=document.getElementById("ExpDynamicContent").innerHTML;
  
    console.log('eee',this.ExperienceData);
  }
}


  ngOnInit() {
  
    this.ckeConfig = {
      allowedContent: true,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        'aa',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
    };
  
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response);
         alert('Your file has been uploaded successfully');
    };
  }

getAllAbouts() {
  this.aboutService.getAbout().subscribe(data => {
   this.abouts=data;
   localStorage.setItem('abouts',JSON.stringify(data));

   console.log('localstorage',localStorage.getItem('abouts'));
  //  this.abouts= data;
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
getAllProjects() {
  this.experienceService.getProjet().subscribe((data: Projet[]) => {
    this.listProjet = data;
 //    this.objectKeys = this.listExperiences.keys;
//console.log('keys',this.listExperiences.keys);

for(let key in this.listProjet){
 if(this.listProjet.hasOwnProperty(key)){
  this.arrayListProjet.push(this.listProjet[key]);

 }
}
console.log('arrayListProjet',this.arrayListProjet);


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
getAllCompetence() {
  this.competenceService.getCompetence().subscribe((data: Competence[]) => {
    this.listComp = data;
for(let key in this.listComp){
 if(this.listComp.hasOwnProperty(key)){
  this.arrayListComp.push(this.listComp[key]);

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
 

saveVersion(){
  this.HtmlContent=document.querySelector('app-edition-cv').innerHTML;
  console.log(this.HtmlContent);
  
  this.version=this.HtmlContent;
  this.version={
      author:'shayma',
      content: this.HtmlContent,
      reason:'reason',


  }


  this.serviceVersion.addVersion(this.version).subscribe();
  console.log('version',this.version.content);


}
preview(files) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}
saveExperience(Poste,StartDate,EndDate,role){
 

const expr= new Experience( Poste,StartDate,EndDate,role)

      this.arrayListExp.push(expr);

}


}