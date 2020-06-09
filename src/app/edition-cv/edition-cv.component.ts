import { Component, OnInit ,EventEmitter, Input,ElementRef,ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImagesService } from '../services/images/images.service';
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
import { FileUploader,FileSelectDirective } from 'ng2-file-upload';
import { LanguesService } from '../services/langues/langues.service';
import { Langue } from '../models/langues';
import { Loisirs } from '../models/loisirs';
import { Divers } from '../models/divers';
import { LoisirService } from '../services/loisirs/loisir.service';
import { DiversService } from '../services/divers/divers.service';
import { CertificatService } from '../services/Certificat/certificat.service';
import { Certificat } from '../models/certificat';
import { Competence, Tools } from '../models/competence';
import { CompetenceService } from '../services/competence/competence.service';
import { VersionService } from '../services/version/version.service';
import { Version } from '../models/version';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators,FormBuilder, FormGroup} from '@angular/forms';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { ChartColors,Traces } from '../models/Traces';
import { HttpClient } from '@angular/common/http';
//import * as filestack from 'filestack-js';
import html2canvas from 'html2canvas';
import { Temp } from '../models/temp';
import { TempService } from '../services/temp/temp.service';
//const URL = 'http://localhost:8080/upload';
const uploadAPI = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-edition-cv',
  templateUrl: './edition-cv.component.html',
  styleUrls: ['./edition-cv.component.css']
 
})



export class EditionCVComponent  implements OnInit {
  image;
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
  public chartColor : ChartColors[];
  public message: string;
  localUrl: any;
  objectKeys :any;
  abouts:any;
  formations:any;
  contacts:any;
  exp: Experience;
  version: Version;temp: Temp;
  langue:Langue;divers:Divers;loisirs:Loisirs;experience:Experience;formation:Formation;certificat:Certificat;competence:Competence;
  HtmlContent: any;
  ColorVersion:ChartColors;AboutVersion:any;LangueVersion:Langue[];LoisirsVersion:Loisirs[];
  DiversVersion:Divers[];ExperienceVersion:Experience[];FormationVersion:Formation[];
  CertificatVersion:Certificat[];CompetenceVersion:Competence[];
  
  toolsArray:Tools[] = []; ProjetArray:Projet[]=[];projet:Projet;
  tool:Tools;listOrga:any[];arrayListOrga=[];
  listExperiences: any[];listProjet: Projet[];listLangues: Langue[];listLoisirs: Loisirs[];listDivers: Divers[];listFormation: Formation[];
  listCertif: Certificat[];listComp: Competence[];

  InitAbout=null;InitLangue=[];InitDivers=[];InitLoisirs=[];InitExperience=[];InitFormation=[];InitCertificat=[];InitCompetence=[];
  arrayListExp :Experience[] = [];arrayListProjet=[];arrayListLang=[];arrayListDivers=[];arrayListLoisirs=[];arrayListFormation=[];
  arrayListCertif=[]; arrayListComp=[];
  public backgroundColor: string;public fontColor: string;public linkColor: string;

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
  private serviceVersion: VersionService,private http: HttpClient,private formBuilder: FormBuilder,
  
  private el: ElementRef, private imagesService: ImagesService,private storage: AngularFireStorage,
  private tempService: TempService
  ){

 this.temp= new  Temp();
    this.chartColor=[
      
      {FirstColor: '#008b8b', SecondColor: '#017777'},
      {FirstColor: '#f0ca68', SecondColor: '#b88709'},
      {FirstColor: '#62382f', SecondColor: '#4d261e'},
      {FirstColor: '#c97545', SecondColor: '#8c451c'},
      {FirstColor: '#c1800b', SecondColor: '#805406'},

      
  ];
  this.FirstColorInit='#008b8b';
  this.SecondColorInit='#017777';
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
    this.localUrl="assets/media/users/user4.jpg";
    /*this.temp={
  concatVersion: 'c',
  aboutVersion:'r', 
  langueVersion:this.InitLangue,
  diverVersion:this.InitDivers,
  loisirVersion:this.InitLoisirs,
  experienceVersion:this.InitExperience,
  formationVersion:this.InitFormation,
  certificatVersion:this.InitFormation,
  competenceVersion:this.InitCompetence,
}*/


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
   this.getAllOrganisation();
console.log('temppp',this.temp);
 
/**concatVersion: any;
    aboutVersion:any;
    langueVersion:any;
    diverVersion:any;
    loisirVersion:any;
    experienceVersion:any;
    formationVersion:any;
    certfificatVersion:any;
    competenceVersion:any; */
   
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
      reader.onload = (e: any) => this.localUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      

      console.log('selected image',this.selectedImage);
/**upload */   
var filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
const fileRef = this.storage.ref(filePath);
this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
  finalize(() => {
    fileRef.getDownloadURL().subscribe((url) => {
    this.imageUrl= url;
    this.localUrl=url;
  //    this.imagesService.insertImageDetails(this.imageUrl);
      console.log('form',this.localUrl);
    //  this.resetForm();
    })
  })
).subscribe();

    }
    else {
      this.selectedImage = null;
    }
  }

  upload() {
    //this.isSubmitted = true;
     
    }


getAllLangues()  {
  this.langueService.getLangues().subscribe((data: Langue[]) => {
    this.listLangues = data;

for(let key in this.listLangues){
 if(this.listLangues.hasOwnProperty(key)){
 this.listLangues[key].id=key;
  this.arrayListLang.push(this.listLangues[key]);
  this.InitLangue.push(this.listLangues[key]);

}

}

  });  

}
getAllAbouts() {
  this.aboutService.getAbout().subscribe(data => {
 this.InitAbout=data;
 this.dataCurrentArray.abouts=this.InitAbout;
  this.AboutVersion=this.InitAbout;

   console.log('AboutVersion',this.AboutVersion);
   console.log('InitAbout',this.dataCurrentArray);

  //  this.abouts= data;
});
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
getAllOrganisation(){
  this.experienceService.getOrganisation().subscribe((data: any[]) => {
    this.listOrga = data;
for(let key in this.listOrga){
 if(this.listOrga.hasOwnProperty(key)){
  this.listOrga[key].id=key;

  this.arrayListOrga.push(this.listOrga[key]);
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
        FirstColor: this.dataCurrentArray.FirstColor,
        SecondColor:this.dataCurrentArray.SecondColor,
        profilePicture:this.localUrl
  
  
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
addLangue(langue,note){
  this.isSubmitted = true;

    
//      this.langue={id: 'key', langue:langue, note: note}
      this.langueService.addLangue(this.langue).subscribe();
      this.arrayListLang=[];
      this.InitLangue=[];
      this.getAllLangues();
      this.LangueVersion=this.arrayListLang;
      this.doSomething() ;

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
  addFormation(University,certification,start_date,end_date,diplome_date){

    this.formation={id:"key",University:University, certification: certification,start_date:start_date,
    end_date:end_date,diplome_date:diplome_date}
    this.formationService.addFormation(this.formation).subscribe();
    this.arrayListFormation=[];
    this.InitFormation=[];
    this.getAllFormation();
    this.FormationVersion=this.arrayListFormation;
    this.doSomething() ;
    }
    addCertificat(centre,certification,diplome_date,start_date,end_date){
      this.certificat={id:"key",centre:centre, certification: certification,start_date:start_date,
      end_date:end_date,diplome_date:diplome_date}
      
      this.certificatService.addCertificat(this.certificat).subscribe();
      this.arrayListCertif=[];
      this.InitCertificat=[];
      this.getAllCertificats();
      this.CertificatVersion=this.arrayListCertif;
      this.doSomething() ;
      }
  addProject(nom,role,tache,moa,moe,techno){
  
    this.projet={ProjetName:nom,ProjetDesc:tache,ProjetShort:role,MOE:moe,MOA:moa,competence:techno}
    this.ProjetArray.push(this.projet);
 console.log('ProjetArray',this.ProjetArray);
  }
  addTool(tool,tool_level){
    this.tool={tool:tool,tools_level:tool_level}
    this.toolsArray.push(this.tool);
 console.log('tools arrat',this.toolsArray);
  }
addCompetence(type,competence,competence_level){
  
  this.competence={id:"key",type:type, competence:competence, competence_level:competence_level,tools:this.toolsArray }
  this.competenceService.addCompetence(this.competence).subscribe();
  console.log('competence added',this.competence);
  this.arrayListComp=[];
  this.InitCompetence=[];
  this.toolsArray=[];
  this.getAllCompetence();
  this.CompetenceVersion=this.arrayListComp;
  this.doSomething() ;
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
saveExperience(fonction,location,emp,dateDebut,dateFin,projet){
  this.isSubmitted = true;
projet=this.arrayListProjet[0];
  //(fonction,location,emp,dateDebut,dateFin,projet)
     this.ProjetArray.push(projet);
     const expr= new Experience(fonction,location,emp,dateDebut,dateFin, this.ProjetArray);

     //this.arrayListExp.push(expr);

     this.experienceService.addExperience(expr).subscribe();
    this.arrayListExp=[];
    this.InitExperience=[];
    this.getAllExperiences();
    this.ExperienceVersion=this.arrayListExp;
    this.doSomething() ;
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

sendImage( ){
  
  html2canvas(document.querySelector("#CONTAINER_PARENT_0")).then(canvas => {
     this.image = canvas.toDataURL();
        canvas.toBlob(function (blob) {
             var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        let base64data = reader.result;
        
      }

    });

  
  });

}
 
    

}