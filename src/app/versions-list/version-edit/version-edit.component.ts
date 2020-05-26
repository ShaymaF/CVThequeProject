import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit ,EventEmitter, Input,ElementRef,ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NativeDateAdapter } from '@angular/material';
import { MatDateFormats, MAT_DATE_LOCALE } from '@angular/material/core';

import { VersionService } from 'src/app/services/version/version.service';

import { ToastrService } from 'ngx-toastr';
import { FileUploader,FileSelectDirective } from 'ng2-file-upload';

import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { HttpClient } from '@angular/common/http';
//import * as filestack from 'filestack-js';
import html2canvas from 'html2canvas';
import { Traces, ChartColors } from 'src/app/models/Traces';
import { Langue } from 'src/app/models/langues';
import { Divers } from 'src/app/models/divers';
import { Experience, Projet } from 'src/app/models/experience';
import { Formation } from 'src/app/models/formation';
import { Certificat } from 'src/app/models/certificat';
import { Competence, Tools } from 'src/app/models/competence';
import { Loisirs } from 'src/app/models/loisirs';
import { Version } from 'src/app/models/version';
import { ContactService } from 'src/app/services/contact/contact.service';
import { FormationService } from 'src/app/services/formation/formation.service';
import { LanguesService } from 'src/app/services/langues/langues.service';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { AboutService } from 'src/app/services/about/about.service';
import { DiversService } from 'src/app/services/divers/divers.service';
import { LoisirService } from 'src/app/services/loisirs/loisir.service';
import { CertificatService } from 'src/app/services/Certificat/certificat.service';
import { ImagesService } from 'src/app/services/images/images.service';
import { CompetenceService } from 'src/app/services/competence/competence.service';
//const URL = 'http://localhost:8080/upload';
const uploadAPI = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-version-edit',
  templateUrl: './version-edit.component.html',
  styleUrls: ['./version-edit.component.css']
})
export class VersionEditComponent implements OnInit {
  private sub: Subscription;
  versionData:any;
id;
  file:any;  
  response:string;
  public uploader: FileUploader = new FileUploader({
    url: uploadAPI,
    itemAlias: 'image'
  });
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());
  dataCurrentArray:Traces;
  dataUndoArray: Array<Traces> = [];
  dataRedoArray: Array<Traces> = [];
  undoLimit: number = 1000;
  showUndo:boolean = false;
  showRedo:boolean = false;

  ckeConfig: any;
  public imagePath;
  mycontent: string;

  imgURL: any;
   FirstColorInit: string;
   SecondColorInit:string;
Short_Desc:boolean=true;
Long_Desc:boolean=false;
langue:Langue;divers:Divers;loisirs:Loisirs;experience:Experience;formation:Formation;certificat:Certificat;competence:Competence;
  public chartColor : ChartColors[];
  public message: string;
  localUrl: any[];
  objectKeys :any;
  abouts:any;
  formations:any;
  contacts:any;
  exp: Experience;
  version: Version;
  toolsArray:Tools[] = [];
  tool:Tools;
  listExperiences: any[];listProjet: Projet[];listLangues: Langue[];listLoisirs: Loisirs[];listDivers: Divers[];listFormation: Formation[];
  listCertif: Certificat[];listComp: Competence[];
  HtmlContent: any;
  ColorVersion:ChartColors;AboutVersion:any;LangueVersion:Langue[];LoisirsVersion:Loisirs[];
  DiversVersion:Divers[];ExperienceVersion:Experience[];FormationVersion:Formation[];
  CertificatVersion:Certificat[];CompetenceVersion:Competence[];
  InitAbout=null;InitLangue=[];InitDivers=[];InitLoisirs=[];InitExperience=[];InitFormation=[];InitCertificat=[];InitCompetence=[];
  arrayListExp :Experience[] = [];arrayListProjet=[];arrayListLang=[];arrayListDivers=[];arrayListLoisirs=[];arrayListFormation=[];
  arrayListCertif=[]; arrayListComp=[];
  public backgroundColor: string;public fontColor: string;public linkColor: string;
  FirstColor:any;SecondColor:any;
  url:any;
  urlExist: boolean=false;
  toppings = new FormControl();
  public Editor= InlineEditor;

  ExperienceData: any;
  imgSrc: string;
  selectedImage: any = null;
  imageUrl:any
  isSubmitted = false;
  titleAlert: string = 'This field is required';
  formLangue: FormGroup;formDivers :FormGroup;
  formLoisir:FormGroup;formCompetence:FormGroup;
  formFormation:FormGroup; formCertificat:FormGroup;
  formExperience:FormGroup;formTool:FormGroup;
 /* public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
 myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }*/

  public onFocus( editor ){
  console.log('event',editor);
    //editor.ui.editor.config.AllowedContent = true;

       editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
   
  }
  public onBlur( {editor,event }) {
    }
    
constructor(private aboutService :AboutService, private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService,
  private toastr: ToastrService, private langueService :LanguesService
  , private diversService : DiversService, private loisirsService :LoisirService,
  private certificatService : CertificatService, private competenceService : CompetenceService,
  private http: HttpClient,private formBuilder: FormBuilder,
  
  private el: ElementRef, private imagesService: ImagesService,
  private storage: AngularFireStorage,private route: ActivatedRoute,
  private router: Router,private serviceVersion: VersionService
  ){


    this.chartColor=[
      
      {FirstColor: '#008b8b', SecondColor: '#017777'},
      {FirstColor: '#f0ca68', SecondColor: '#b88709'},
      {FirstColor: '#62382f', SecondColor: '#4d261e'},
      {FirstColor: '#c97545', SecondColor: '#8c451c'},
      {FirstColor: '#c1800b', SecondColor: '#805406'},

      
  ];
 
  this.ColorVersion={FirstColor:'#008b8b', SecondColor: '#017777'};
  console.log('ltest',this.ColorVersion);
  this.LangueVersion=this.InitLangue;
  console.log('InitAbout',this.InitAbout);
console.log('AboutVersion',this.AboutVersion);

  this.dataCurrentArray={FirstColor:'#008b8b', SecondColor: '#017777', abouts:this.InitAbout,
langues:this.InitLangue,loisirs:this.InitLoisirs,divers:this.InitDivers,experiences:this.InitExperience,
formations:this.InitFormation,certificats:this.InitCertificat,competences:this.InitCompetence};

console.log('dataCurrentArray',this.dataCurrentArray); 

   // var editor1=this.Editor.replace('Editor');
    //editor1.config.allowedContent = true;
    //DecoupledEditor.replace('Editor', { extraAllowedContent: '*(*)' });

    console.log('ltest',this.arrayListExp);


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

    this.sub = this.route.paramMap.subscribe(
      params => {
       this.id = params.get('id');});  
        console.log('id',this.id )
    this.formLangue = this.formBuilder.group({
      langue: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
    });
    this.formLoisir = this.formBuilder.group({
      desc: new FormControl('', Validators.required)
     
    });
    this.formCompetence = this.formBuilder.group({
      type: new FormControl('', Validators.required),
      competence: new FormControl('', Validators.required),
      competence_level: new FormControl('', Validators.required)
    });
    this.formTool = this.formBuilder.group({
      tool: new FormControl('', Validators.required),
      tool_level: new FormControl('', Validators.required),
    });
    this.formFormation = this.formBuilder.group({
      University: new FormControl('', Validators.required),
      certification: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      diplome_date: new FormControl('', Validators.required)


    });
    this.formCertificat = this.formBuilder.group({
      centre: new FormControl('', Validators.required),
      certification: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      diplome_date: new FormControl('', Validators.required)
    });
    this.formExperience = this.formBuilder.group({
      caption: new FormControl('', Validators.required),
      category: new FormControl(''),
      imageUrl: new FormControl('', Validators.required)
    });
    this.formDivers = this.formBuilder.group({
      desc: new FormControl('', Validators.required)
    });
    // this.serviceVersion.uploadImage(file._file,file._file.name).subscribe();

    this.uploader.onAfterAddingFile = (file) => {
     // file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
    this.getAllLangues();
    this.getAllAbouts();
    this.getAllContacts();
    this.getAllExperiences();
    this.getAllDivers();
    this.getAllLoisirs();
   this.getAllFormation();
   this.getAllCertificats();
   this.getAllCompetence();
   this.getAllProjects();
   
   
  

   
    if(document.getElementById("ExpDynamicContent") != null){
      this.ExperienceData=document.getElementById("ExpDynamicContent").innerHTML;
    
      console.log('eee',this.ExperienceData);
    }
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
  
  /*  this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response);
         alert('Your file has been uploaded successfully');
    };
    */
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log('selected image',this.selectedImage);
    }
    else {
      this.selectedImage = null;
    }
  }

  upload() {
    //this.isSubmitted = true;
      var filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
          this.imageUrl= url;
            this.imagesService.insertImageDetails(this.imageUrl);
            console.log('form',this.imageUrl);
          //  this.resetForm();
          })
        })
      ).subscribe();
    }

getAllAbouts() {
  this.serviceVersion.getOneVersion(this.id).subscribe(data => {
 this.versionData=data;
  this.InitAbout=this.versionData.aboutVersion;

 this.FirstColorInit=this.versionData.FirstColor;
 this.SecondColorInit=this.versionData.SecondColor;

 this.dataCurrentArray.abouts=this.InitAbout;
  this.AboutVersion=this.InitAbout;

   console.log('AboutVersion',this.AboutVersion);
   console.log('InitAbout',this.dataCurrentArray);

  //  this.abouts= data;
});
}
getAllLangues()  {
   this.serviceVersion.getOneVersion(this.id).subscribe(data => {
  this.versionData = data;
  this.InitLangue=this.versionData.langueVersion;
   })
}
getAllLoisirs() {
  this.loisirsService.getLoisirs().subscribe((data: Loisirs[]) => {
    this.listLoisirs = data;
for(let key in this.listLoisirs){
 if(this.listLoisirs.hasOwnProperty(key)){
  this.listLoisirs[key].id=key;

  this.arrayListLoisirs.push(this.listLoisirs[key]);
  this.InitLoisirs.push(this.listLoisirs[key]);

}
}
  });  
}
getAllContacts() {
  this.contactService.getContacts().subscribe(data => {
   this.contacts= data;
});
}


getAllDivers() {
  this.diversService.getDivers().subscribe((data: Loisirs[]) => {
    this.listDivers = data;
for(let key in this.listDivers){
 if(this.listDivers.hasOwnProperty(key)){
  this.listDivers[key].id=key;

  this.arrayListDivers.push(this.listDivers[key]);
  this.InitDivers.push(this.listDivers[key]);

}
}
  });  
}

getAllCertificats() {
  this.certificatService.getCertificat().subscribe((data: Certificat[]) => {
    this.listCertif = data;
for(let key in this.listCertif){
 if(this.listCertif.hasOwnProperty(key)){
  this.listCertif[key].id=key;

  this.arrayListCertif.push(this.listCertif[key]);
  this.InitCertificat.push(this.listCertif[key]);

}
}
  });  
}

getAllExperiences() {
  this.experienceService.getExperience().subscribe((data: Experience[]) => {
    this.listExperiences = data;
for(let key in this.listExperiences){
 if(this.listExperiences.hasOwnProperty(key)){
  this.listExperiences[key].id=key;

  this.arrayListExp.push(this.listExperiences[key]);
  this.InitExperience.push(this.listExperiences[key]);

 }
}
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
  this.listFormation[key].id=key;

  this.arrayListFormation.push(this.listFormation[key]);
  this.InitFormation.push(this.listFormation[key]);

}
}
  });  
}
getAllCompetence() {
  this.competenceService.getCompetence().subscribe((data: Competence[]) => {
    this.listComp = data;

for(let key in this.listComp){
 if(this.listComp.hasOwnProperty(key)){
  this.listComp[key].id=key;
  this.arrayListComp.push(this.listComp[key]);
  this.InitCompetence.push(this.listComp[key]);
console.log('competence list',this.arrayListComp);
//console.log('tool list',this.InitCompetence.tools);

    

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
 
capture() {
 
  
}
saveVersion(raison,statut){
  var capturedImage;
  html2canvas(document.querySelector("#CONTAINER_PARENT_0")).then(canvas => {
     capturedImage = canvas.toDataURL();
        canvas.toBlob(function (blob) {
             var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        let base64data = reader.result;
        
      }

    });
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    this.version={
        author:'Admin',
        reason:raison,
        statut:statut,
        dateVersion: dateTime ,
        concatVersion: this.contacts,
        aboutVersion: this.InitAbout,
        langueVersion: this.InitLangue,
        diverVersion: this.InitDivers,
        loisirVersion: this.InitLoisirs,
        experienceVersion: this.arrayListExp,
        formationVersion: this.InitFormation,
        certfificatVersion: this.InitCertificat ,
        competenceVersion: this.InitCompetence,
        image: capturedImage,
        FirstColor:this.dataCurrentArray.FirstColor,
        SecondColor:this.dataCurrentArray.SecondColor,
        profilePicture:null
    }
  
  
    this.serviceVersion.addVersion(this.version).subscribe();
    console.log('version',this.version);
  
  });

 

}
deleteLangue(id)
{ 
   this.langueService.deleteLangues(id).subscribe();
 this.arrayListLang=[];
 this.InitLangue=[];
 this.getAllLangues();
 this.LangueVersion=this.arrayListLang;
 this.doSomething() ;
}
deleteLoisirs(id){
  this.loisirsService.deleteLoisirs(id).subscribe();
  this.arrayListLoisirs=[];
  this.InitLoisirs=[];
  this.getAllLoisirs();
  this.LoisirsVersion=this.arrayListLoisirs;
  this.doSomething() ;
}
deleteDivers(id){ this.diversService.deleteDivers(id).subscribe();
  this.arrayListDivers=[];
  this.InitDivers=[];
  this.getAllDivers();
  this.DiversVersion=this.arrayListDivers;
  this.doSomething() ;
}
deleteExperience(id){ this.experienceService.deleteExperience(id).subscribe();
  this.arrayListExp=[];
  this.InitExperience=[];
  this.getAllExperiences();
  this.ExperienceVersion=this.arrayListExp;
  this.doSomething() ;
}
deleteFormation(id){ this.formationService.deleteFormation(id).subscribe();
  this.arrayListFormation=[];
  this.InitFormation=[];
  this.getAllFormation();
  this.FormationVersion=this.arrayListFormation;
  this.doSomething() ;
}
deleteCertificat(id){ this.certificatService.deleteCertificat(id).subscribe();
  this.arrayListCertif=[];
  this.InitCertificat=[];
  this.getAllCertificats();
  this.CertificatVersion=this.arrayListCertif;
  this.doSomething() ;
}
deleteCompetence(id){ this.competenceService.deleteCompetence(id).subscribe();
  this.arrayListComp=[];
  this.InitCompetence=[];
  this.getAllCompetence();
  this.CompetenceVersion=this.arrayListComp;
  this.doSomething() ;
}
addLangue(){
  this.isSubmitted = true;

  if (this.formLangue.valid) {

//this.langue={id: 'key', langue:langue, note: note}
this.langueService.addLangue(this.formLangue.value).subscribe();
this.arrayListLang=[];
this.InitLangue=[];
this.getAllLangues();
this.LangueVersion=this.arrayListLang;
this.doSomething() ;
}
this.formLangue.reset();
}
addLoisirs(){
  this.isSubmitted = true;

  if (this.formLoisir.valid) {

  //this.loisirs={id: 'key', desc}
  this.loisirsService.addLoisirs(this.formLoisir.value).subscribe();
  this.arrayListLoisirs=[];
  this.InitLoisirs=[];
  this.getAllLoisirs();
  this.LoisirsVersion=this.arrayListLoisirs;
  this.doSomething() ;
  }
}
  addDivers(){
    this.isSubmitted = true;

    if (this.formDivers.valid) {

    //this.divers={id: 'key', desc:desc}
    this.diversService.addDivers(this.formDivers.value).subscribe();
    this.arrayListDivers=[];
    this.InitDivers=[];
    this.getAllDivers();
    this.DiversVersion=this.arrayListDivers;
    this.doSomething() ;
    }
  }
addFormation(){
  this.isSubmitted = true;

  if (this.formFormation.valid) {

//this.formation={id: 'key', University:University, certification: certification,start_date:start_date,
//end_date:end_date,diplome_date:diplome_date}
this.formationService.addFormation(this.formFormation.value).subscribe();
this.arrayListFormation=[];
this.InitFormation=[];
this.getAllFormation();
this.FormationVersion=this.arrayListFormation;
this.doSomething() ;
}
}
addCertificat(){
  this.isSubmitted = true;

  if (this.formCertificat.valid) {

 // this.certificat={id: 'key', centre:centre, certification: certification,start_date:start_date,
  //end_date:end_date,diplome_date:diplome_date}
  
  this.certificatService.addCertificat(this.formCertificat.value).subscribe();
  this.arrayListCertif=[];
  this.InitCertificat=[];
  this.getAllCertificats();
  this.CertificatVersion=this.arrayListCertif;
  this.doSomething() ;
  }
  }
  addTool(tool,tool_level){
    this.isSubmitted = true;

    if (this.formTool.valid) {

    this.tool={tool:tool,tools_level:tool_level}
    this.toolsArray.push(this.tool);
 console.log('tools arrat',this.toolsArray);
  }
}
  addCompetence(){
    this.isSubmitted = true;

    if (this.formCompetence.valid) {

    //this.competence={id: 'key',type:type, competence:competence, competence_level:competence_level,tools:this.toolsArray }
    this.competenceService.addCompetence(this.formCompetence.value).subscribe();
    console.log('competence added',this.competence);
    this.arrayListComp=[];
    this.InitCompetence=[];
    this.toolsArray=[];
    this.getAllCompetence();
    this.CompetenceVersion=this.arrayListComp;
    this.doSomething() ;
    }
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
  this.isSubmitted = true;


//const expr= new Experience( Poste,StartDate,EndDate,role)

   //   this.arrayListExp.push(expr);

     
//this.arrayListExp.push(experience);
//console.log('expr',expr);


  console.log('save',this.arrayListExp);
}
changeColor(paint){
  this.ColorVersion=
    {FirstColor: paint.FirstColor, SecondColor: paint.SecondColor}
  
  console.log('colorversion', this.ColorVersion)
  this.doSomething();
if(this.dataCurrentArray!=null)
  {this.FirstColorInit = this.dataCurrentArray.FirstColor;
  this.SecondColorInit= this.dataCurrentArray.SecondColor;
//this.abouts=this.dataCurrentArray.abouts
}
}

onChange({editor}: ChangeEvent){
  console.log('aboutVersion',this.AboutVersion);

 this.AboutVersion=editor.getData();
 this.doSomething();
//console.log('abouts',this.abouts);
console.log('aboutVersion',this.AboutVersion);
}
LongDesc(){
  this.Short_Desc=false;
  this.Long_Desc=true;}
ShortDesc(){
  this.Short_Desc=true;
  this.Long_Desc=false;
}


doSomething() {
  //this.TempVersion=document.getElementById("content").innerHTML;
  if (this.ColorVersion != null || this.AboutVersion!=null|| this.LangueVersion!=null
    ||this.DiversVersion!=null||this.LoisirsVersion!=null||this.ExperienceVersion!=null
    ||this.FormationVersion!=null||this.CertificatVersion!=null||this.CompetenceVersion!=null
    )
  {

    this.dataRedoArray = [];
    this.showRedo = false;
    if (this.dataCurrentArray  == null) {

      this.dataCurrentArray={
        FirstColor:this.ColorVersion.FirstColor,
        SecondColor:this.ColorVersion.SecondColor,
        abouts:this.AboutVersion,
        langues:this.LangueVersion,loisirs:this.LoisirsVersion,divers:this.DiversVersion,experiences:this.ExperienceVersion,
        formations:this.FormationVersion,certificats:this.CertificatVersion,competences:this.CompetenceVersion
      }

    } else {
      if (this.dataUndoArray.length == this.undoLimit) {
        this.dataUndoArray.reverse().pop();
        this.dataUndoArray.reverse();
      }
      this.dataUndoArray.push(this.dataCurrentArray);  
   
      this.dataCurrentArray={
        FirstColor:this.ColorVersion.FirstColor,
        SecondColor:this.ColorVersion.SecondColor,
        abouts:this.AboutVersion,
        langues:this.LangueVersion,loisirs:this.LoisirsVersion,divers:this.DiversVersion,experiences:this.ExperienceVersion,
        formations:this.FormationVersion,certificats:this.CertificatVersion,competences:this.CompetenceVersion

      }
      this.showUndo = true;
    }   
  } else {
    alert('Please type something.')
  }
 
console.log('dosomething',this.dataCurrentArray);

  //this.test = 0;
}



undo(): void {
  this.showRedo = true;
  if (this.dataUndoArray.length != 0) {    
    this.dataRedoArray.push(this.dataCurrentArray);  
    this.dataCurrentArray=this.dataUndoArray.pop();

    if (this.dataUndoArray.length == 0) {
      this.showUndo = false;
    }
  }    
;
console.log('undo',this.dataCurrentArray)


  this.FirstColorInit = this.dataCurrentArray.FirstColor;
  this.SecondColorInit= this.dataCurrentArray.SecondColor;
  this.InitAbout=this.dataCurrentArray.abouts;
  this.InitLangue=[];this.InitLangue=this.dataCurrentArray.langues;
  this.InitLoisirs=[];this.InitLoisirs=this.dataCurrentArray.loisirs;
  this.InitDivers=[];this.InitDivers=this.dataCurrentArray.divers;
  this.InitExperience=[];this.InitExperience=this.dataCurrentArray.experiences;
  this.InitFormation=[];this.InitFormation=this.dataCurrentArray.formations;
  this.InitCertificat=[];this.InitCertificat=this.dataCurrentArray.certificats;
  this.InitCompetence=[];this.InitCompetence=this.dataCurrentArray.competences;

    console.log('undo abouts',this.InitAbout)

}

redo(): void {
   if (this.dataRedoArray.length != 0) {    
    this.dataUndoArray.push(this.dataCurrentArray);
    this.dataCurrentArray=this.dataRedoArray.pop();

    if (this.dataRedoArray.length == 0) {
      this.showRedo = false;
    }
  }

  if (this.dataUndoArray.length > 0) {
    this.showUndo = true;
  } else {
    this.showUndo = false;
  }  
  console.log('redo',this.dataCurrentArray)
  this.FirstColorInit = this.dataCurrentArray.FirstColor;
  this.SecondColorInit= this.dataCurrentArray.SecondColor;
  this.InitAbout=this.dataCurrentArray.abouts;
  this.InitLangue=[];this.InitLangue=this.dataCurrentArray.langues;
  this.InitLoisirs=[];this.InitLoisirs=this.dataCurrentArray.loisirs;
  this.InitDivers=[];this.InitDivers=this.dataCurrentArray.divers;
  this.InitExperience=[];this.InitExperience=this.dataCurrentArray.experiences;
  this.InitFormation=[];this.InitFormation=this.dataCurrentArray.formations;
  this.InitCertificat=[];this.InitCertificat=this.dataCurrentArray.certificats;
  this.InitCompetence=[];this.InitCompetence=this.dataCurrentArray.competences;

}

get formLangueControls() {
  return this.formLangue.controls;
}
get formLoisirControls() {
  return this.formLoisir.controls;
}
onReset() {
  this.isSubmitted=false;

  this.formCertificat.reset();
  this.formCompetence.reset();
  this.formDivers.reset();
  this.formLangue.reset();
  this.formTool.reset();
  this.formLoisir.reset();
  this.formFormation.reset();
  this.formExperience.reset();

 /*this.formLangue.setValue({
    langue: '',
    note: ''

  });*/

}



}