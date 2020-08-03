import { Component, OnInit, ElementRef } from '@angular/core';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {  ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { from, Subscription } from 'rxjs';
import html2canvas from 'html2canvas';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { ActivatedRoute, Router } from '@angular/router';
import { About } from 'src/app/shared/models/about';
import { Pdf, Person } from 'src/app/shared/models/person';
import { Experience, Projet } from 'src/app/shared/models/experience';
import { Version, Folder } from 'src/app/shared/models/version';
import { Langue } from 'src/app/shared/models/langues';
import { Divers } from 'src/app/shared/models/divers';
import { Loisirs } from 'src/app/shared/models/loisirs';
import { Formation } from 'src/app/shared/models/formation';
import { Certificat } from 'src/app/shared/models/certificat';
import { Competence, Tools } from 'src/app/shared/models/competence';
import { Contact } from 'src/app/shared/models/contact';
import { Traces, ChartColors } from 'src/app/shared/models/Traces';
import { Temp } from 'src/app/shared/models/temp';
import { VersionService } from 'src/app/shared/services/version/version.service';
import { AboutService } from 'src/app/shared/services/about/about.service';
import { FormationService } from 'src/app/shared/services/formation/formation.service';
import { ContactService } from 'src/app/shared/services/contact/contact.service';
import { ExperienceService } from 'src/app/shared/services/experience/experience.service';
import { LanguesService } from 'src/app/shared/services/langues/langues.service';
import { LoisirService } from 'src/app/shared/services/loisirs/loisir.service';
import { DiversService } from 'src/app/shared/services/divers/divers.service';
import { CertificatService } from 'src/app/shared/services/Certificat/certificat.service';
import { CompetenceService } from 'src/app/shared/services/competence/competence.service';
import { ImagesService } from 'src/app/shared/services/images/images.service';
import { PersonService } from 'src/app/shared/services/person/person.service';
import { TempService } from 'src/app/shared/services/temp/temp.service';

declare var require: any
const FileSaver = require('file-saver');

//const URL = 'http://localhost:8080/upload';
const uploadAPI = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-version-edit',
  templateUrl: './version-edit.component.html',
  styleUrls: ['./version-edit.component.css']
})
export class VersionEditComponent implements OnInit {

public Editor= InlineEditor;profil;template;
positionX:string;positionY:string;showPopup;positionXInit=null;positionYInit=null;
positionNameInit=null;positionEmailInit=null;positionTelInit=null;positionAdressInit=null;positionLinkedinInit=null;
positionAboutInit=null;positionFormationInit=null;positionCertificatInit=null;positionCompetenceInit=null;
positionLangueInit=null;positionLoisirsInit=null;positionDiversInit=null;positionExperienceInit=null;
positionImageInit=null;positionArabeNameInit=null;positionGenderInit=null;
image:any;
pdfHtml:any;pdfHtml1:any;
linkCSS:string;
abouts:About;html:Pdf;
exp: Experience;
contacts:any;
version: Version;temp: Temp;person:Person;
langue:Langue;divers:Divers;loisirs:Loisirs;experience:Experience;formation:Formation;certificat:Certificat;competence:Competence;
index=0;
toolsArray:Tools[] = []; ProjetArray:Projet[]=[];projet:Projet;
tool:Tools;listOrga:any[];arrayListOrga=[];listAbout: About[];
listExperiences: any[];listProjet: Projet[];listFolders:Folder[];listLangues: Langue[];listLoisirs: Loisirs[];listDivers: Divers[];listFormation: Formation[];
listCertif: Certificat[];listComp: Competence[];listContact: Contact[];listPerson: Person[];
style:any;currentStyle:any;
InitAbout=[];InitLangue=[];InitPerson=[];InitContact=[];InitDivers=[];InitLoisirs=[];InitExperience=[];InitFormation=[];InitCertificat=[];InitCompetence=[];
arrayListExp :Experience[] = [];arrayListFolder:Folder[];arrayListProjet=[];arrayListPerson=[];arrayListLang=[];arrayListDivers=[];arrayListLoisirs=[];arrayListFormation=[];
arrayListCertif=[]; arrayListComp=[];arrayListCantact=[];
text:any;
file:any;  
response:string;
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
formations:any;
HtmlContent: any;
ColorVersion:ChartColors;AboutVersion:any;PersonVersion:any;LangueVersion:Langue[];LoisirsVersion:Loisirs[];
DiversVersion:Divers[];ExperienceVersion:Experience[];FormationVersion:Formation[];
CertificatVersion:Certificat[];CompetenceVersion:Competence[];
public backgroundColor: string;public fontColor: string;public linkColor: string;
url:any;
urlExist: boolean=false;
ExperienceData: any;
imgSrc: string;
selectedImage: any = null;
imageUrl:any
isSubmitted = false;
titleAlert: string = 'This field is required';
arabicNameSection;
private sub: Subscription;
showAdresse:boolean=true;
id;



  listVersion;
  arrayListVersion=[];
 
    
constructor(private aboutService: AboutService,
  private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService,
  private toastr: ToastrService, private langueService :LanguesService
  , private diversService : DiversService, private loisirsService :LoisirService,
  private certificatService : CertificatService, private competenceService : CompetenceService,
  private serviceVersion: VersionService,private http: HttpClient,private formBuilder: FormBuilder,
  private el: ElementRef, private imagesService: ImagesService,private storage: AngularFireStorage,
  private tempService: TempService,private personService:PersonService,private route: ActivatedRoute,
  private versionService: VersionService) {

    if(this.template=="cv1"){document.getElementById("cv1").style.display="inherit";}
    else if(this.template=="cv2"){document.getElementById("cv2").style.display="inherit";}
  
   }

arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
public ngOnInit( ) {
  console.log('idf',localStorage.getItem("IDF"))
  this.sub = this.route.paramMap.subscribe(
    params => {
     this.id = params.get('id');});  
      console.log('id',this.id )
     this.getOnVersion();
   
   
     this.chartColor=[
      
      {FirstColor: '#008b8b', SecondColor: '#017777'},
      {FirstColor: '#f0ca68', SecondColor: '#b88709'},
      {FirstColor: '#62382f', SecondColor: '#4d261e'},
      {FirstColor: '#c97545', SecondColor: '#8c451c'},
      {FirstColor: '#c1800b', SecondColor: '#805406'},
      
  ];
  
  
  
  
  
     this.getAllProjects();
     this.getAllOrganisation();
     this.getFolders();
      //initial position of draged elements
     
    // initial template color;
     this.FirstColorInit='#008b8b';
     this.SecondColorInit='#017777';
     this.ColorVersion={FirstColor:'#008b8b', SecondColor: '#017777'};
     
     this.dataCurrentArray={FirstColor:'#008b8b', SecondColor: '#017777', abouts:this.InitAbout,
     langues:this.InitLangue,loisirs:this.InitLoisirs,divers:this.InitDivers,experiences:this.InitExperience,
     formations:this.InitFormation,certificats:this.InitCertificat,competences:this.InitCompetence,
     positionName:this.positionNameInit,positionEmail:this.positionNameInit,positionTel:this.positionNameInit,
     positionAdress:this.positionNameInit, positionLinkedin:this.positionNameInit, positionAbout:this.positionNameInit,
     positionFormation:this.positionNameInit,positionCetificat:this.positionNameInit,positionCompetence:this.positionNameInit,
     positionLangue:this.positionNameInit,positionLoisirs:this.positionNameInit,positionDivers:this.positionNameInit,
     positionExperience:this.positionNameInit,positionImage:this.positionNameInit,positionArabeName:this.positionNameInit,
     positionGender:this.positionNameInit
   };
 
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
       for(let key in this.listProjet){
     if(this.listProjet.hasOwnProperty(key)){
      this.arrayListProjet.push(this.listProjet[key]);
    
     }
    }
    
      });  
    }
getOnVersion(){

  this.arrayListVersion=[];
  this.versionService.getOneVersion(this.id,localStorage.getItem("IDF")).subscribe((data: Version) => {
    this.listVersion = data;
console.log(this.listVersion);
this.template=this.listVersion.temp;
console.log('temp',this.template)
console.log('InitAbout',this.InitAbout)
if(this.template=="cv1"){document.getElementById("cv1").style.display="inherit";}
else if(this.template=="cv2"){document.getElementById("cv2").style.display="inherit";}
this.PersonVersion=this.listVersion.personVersion;
this.listPerson=this.listVersion.personVersion;
this.InitAbout=this.listVersion.aboutVersion;
this.FirstColorInit=this.listVersion.FirstColor;
this.SecondColorInit=this.listVersion.SecondColor;
this.InitCertificat=this.listVersion.certfificatVersion;
this.InitCompetence=this.listVersion.competenceVersion;
this.InitDivers=this.listVersion.diverVersion;
this.InitExperience=this.listVersion.experienceVersion;
this.InitFormation=this.listVersion.formationVersion;
this.InitLangue=this.listVersion.langueVersion;
this.InitLoisirs=this.listVersion.loisirVersion;
this.positionNameInit=this.listVersion.positionName;
console.log('position',this.listVersion.positionName)
     this.positionArabeNameInit=this.listVersion.positionArabeName;
     this.positionGenderInit=this.listVersion.positionGender
     this.positionImageInit=this.listVersion.positionImage;
     this.positionAdressInit=this.listVersion.positionAdress;
     this.positionTelInit=this.listVersion.positionTel;
     this.positionEmailInit=this.listVersion.positionEmail;
     this.positionLinkedinInit=this.listVersion.positionLinkedin;
     this.positionAboutInit=this.listVersion.positionAbout;
     this.positionCertificatInit=this.listVersion.positionCetificat;
     this.positionFormationInit=this.listVersion.positionFormation;
     this.positionCompetenceInit=this.listVersion.positionCompetence;
     this.positionLangueInit=this.listVersion.positionLangue;
     this.positionLoisirsInit=this.listVersion.positionLoisirs;
     this.positionDiversInit=this.listVersion.positionDivers;
     this.positionExperienceInit=this.listVersion.positionExperience;
     document.getElementById("name").style.transform=this.positionNameInit;
     document.getElementById("arabicName").style.transform=this.positionArabeNameInit;
     document.getElementById("gender").style.transform=this.positionGenderInit;
     document.getElementById("picture").style.transform=this.positionImageInit;
     document.getElementById("adresse").style.transform=this.positionAdressInit;
     document.getElementById("tel").style.transform=this.positionTelInit;
     document.getElementById("mail").style.transform=this.positionEmailInit;
     document.getElementById("linkedin").style.transform=this.positionLinkedinInit;
     document.getElementById("about").style.transform=this.positionAboutInit;
     document.getElementById("certificat").style.transform=this.positionCertificatInit;
     document.getElementById("formation").style.transform=this.positionFormationInit;
     document.getElementById("competence").style.transform=this.positionCompetenceInit;
     document.getElementById("langue").style.transform=this.positionLangueInit;
    document.getElementById("loisir").style.transform= this.positionLoisirsInit;
     document.getElementById("divers").style.transform=this.positionDiversInit;
     document.getElementById("projet").style.transform=this.positionExperienceInit;
console.log('person',this.InitAbout);
});
}
   //get positions of dragged elements
  dragName($event: CdkDragEnd) {
    this.positionNameInit=document.getElementById("name").style.transform;
    this.doSomething();
    }
    dragArabicName($event: CdkDragEnd) {
      this.positionArabeNameInit=document.getElementById("arabicName").style.transform;
      this.doSomething();
      }
    dragGender($event: CdkDragEnd) {
      this.positionGenderInit=document.getElementById("gender").style.transform;
      this.doSomething();
      }
   dragImage($event: CdkDragEnd) {
      this.positionImageInit=document.getElementById("picture").style.transform;
      this.doSomething();
      }
  
    dragEmail($event: CdkDragEnd) {
      this.positionEmailInit=document.getElementById("mail").style.transform;
      this.doSomething();
    }
    dragTel($event: CdkDragEnd) {
      this.positionTelInit=document.getElementById("tel").style.transform;
      this.doSomething();
    }
    dragLinkedin($event: CdkDragEnd) {
      this.positionLinkedinInit=document.getElementById("linkedin").style.transform;
     this.doSomething();
     }
   dragAdresse($event: CdkDragEnd) {
     this.positionAdressInit=document.getElementById("adresse").style.transform;
     this.doSomething();
      }
  
  dragAbout($event: CdkDragEnd) {
    this.positionAboutInit=document.getElementById("about").style.transform;
    this.doSomething();
     }
  dragFormation($event: CdkDragEnd) {
      this.positionFormationInit=document.getElementById("formation").style.transform;
      this.doSomething();
     }
  dragCertificat($event: CdkDragEnd) {
        this.positionCertificatInit=document.getElementById("certificat").style.transform;
        this.doSomething();
     } 
  dragCompetence($event: CdkDragEnd) {
      this.positionCompetenceInit=document.getElementById("competence").style.transform;
      this.doSomething();
   } 
  
   dragLangue($event: CdkDragEnd) {
    this.positionLangueInit=document.getElementById("langue").style.transform;
    this.doSomething();
  } 
  
  dragLoisir($event: CdkDragEnd) {
    this.positionLoisirsInit=document.getElementById("loisir").style.transform;
    this.doSomething();
  } 
  
  dragDivers($event: CdkDragEnd) {
    this.positionDiversInit=document.getElementById("divers").style.transform;
    this.doSomething();
  } 
  
  dragProjet($event: CdkDragEnd) {
    this.positionExperienceInit=document.getElementById("projet").style.transform;
    this.doSomething();
  } 
  
    //return person languages
 
    addLangue(langue,note){
          this.langue={ langue:langue, note: note,uid:""}
          this.arrayListLang.push( this.langue);
         this.LangueVersion=this.arrayListLang;
        
       this.doSomething() ;
       if(this.dataCurrentArray!=null)
    {this.InitLangue = this.dataCurrentArray.langues;}
    
    }
  
    //export to pdf 
  public pdf(){
    var tempID;
    if(this.template=="temp2"){tempID="cv1";}
      else if(this.template=="temp1"){tempID="cv2";}
    this.pdfHtml1=document.getElementById(tempID).innerHTML;
   this.linkCSS=' <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"><link href="https://firebasestorage.googleapis.com/v0/b/cvthequepfe.appspot.com/o/temp2.css?alt=media&token=dae2afc6-7b02-49ac-94a4-7de1885c179b" rel="stylesheet" type="text/css" />';
  //this.linkCSS='<link href="https://firebasestorage.googleapis.com/v0/b/cvthequepfe.appspot.com/o/styleCv1.css?alt=media&token=120c3990-ec8c-4583-9efa-20a6444acda1" rel="stylesheet" type="text/css" />';
  
  this.pdfHtml=this.linkCSS+''+ this.pdfHtml1;
    //console.log(this.pdfHtml);
  
    this.html ={"html":this.pdfHtml};
  
   
  
  this.aboutService.download(this.html).subscribe();
  this.load();
  /*this.aboutService.getPDF().subscribe(data => {
   console.log('data',data);
   });*/
  //window.open('localhost:8080/about/getPDF');
  //window.URL.createObjectURL(res)
  }
  isLoading = false;
  
    load() : void {
      this.isLoading = true;
      const pdfUrl = 'localhost:8080/about/getPDF';
      const pdfName = 'cv';
      setTimeout( () => {this.isLoading = false;FileSaver.saveAs(pdfUrl, pdfName)}, 1500*10 )
  
    }
  changePersonalInfo(e,id){
  
    if(e.target.checked){
      document.getElementById(id).style.display="unset";
    }
    else{
      document.getElementById(id).style.display="none";
    }
  }
  onLangueChange(e,id,langue) {
  
    if(e.target.checked){
      this.InitLangue.push(langue);
    }
    else{
       this.InitLangue.splice(langue,1);
       console.log('InitLangue',this.InitLangue);
    }
  }
  onLoisirsChange(e,id,loisirs) {
    if(e.target.checked){
      this.InitLoisirs.push(loisirs);
    }
    else{
       this.InitLoisirs.splice(loisirs.desc,1);
    }
  }
  
  onFormationChange(e,id,formation) {
  
    if(e.target.checked){
      this.InitFormation.push(formation);
  
    }
    else{
     this.InitFormation.splice(formation.certification,1);
  
    }
  }
  onExperienceChange(e,id,experience){
    if(e.target.checked){
      this.InitExperience.push(experience);
  
    }
    else{
       this.InitExperience.splice(experience,1);
  
    }
  }
  onCertificatChange(e,id,certif) {
    if(e.target.checked){
      this.InitCertificat.push(certif);
  
    }
    else{
   
       this.InitCertificat.splice(certif,1);
  
    }
  }
  onCompetenceChange(e,id,cmp) {
    if(e.target.checked){
      this.InitCompetence.push(cmp);
    }
    else{
   
       this.InitCompetence.splice(cmp.id,1);
    }
  }
  increase(note,langue){
    var i=this.InitLangue.indexOf(langue);
    this.InitLangue[i].note=note++;
    this.arrayListLang[i].note=note--;
  }
  decrease(note,langue){
    var i=this.InitLangue.indexOf(langue);
    this.InitLangue[i].note=note--;
    this.arrayListLang[i].note=note--;
  }
  decreaseComp(note,cmp){
    var i=this.InitLangue.indexOf(cmp);
    this.InitCompetence[i].note=note--;
    this.arrayListComp[i].note=note--;
  }
  
  increaseComp(note,cmp){
    var i=this.InitLangue.indexOf(cmp);
    this.InitCompetence[i].note=note++;
    this.arrayListComp[i].note=note--;
  }
  onCantactChange(e,id,cmp) {
    if(e.target.checked){
         this.index=this.InitContact.indexOf(cmp);
    }
  }
  
  hideSection(id){
    document.getElementById(id).hidden=true;
  }
  showSection(id){
    document.getElementById(id).hidden=false;
  }
  
  addLoisirs(loisir){
  this.loisirs={uid:"", desc:loisir}
  this.arrayListLoisirs.push(this.loisirs);
  this.LoisirsVersion=this.arrayListLoisirs;
  this.doSomething() ;
  if(this.dataCurrentArray!=null)
  {this.InitLoisirs = this.dataCurrentArray.loisirs;}
  
  }
  
    addFormation(University,certification,start_date,end_date,diplome_date){
  
      this.formation={uid:"", University:University, certification: certification,start_date:start_date,
      end_date:end_date,diplome_date:diplome_date}
   
  
      this.arrayListFormation.push( this.formation);
      this.FormationVersion=this.arrayListFormation;
    this.doSomething() ;
    if(this.dataCurrentArray!=null)
    {this.InitFormation = this.dataCurrentArray.formations;}
      }
  
      addCertificat(centre,certification,diplome_date,start_date,end_date){
        this.certificat={ uid:"",centre:centre, certification: certification,start_date:start_date,
        end_date:end_date,diplome_date:diplome_date}
       
        this.arrayListCertif.push( this.certificat);
        this.CertificatVersion=this.arrayListCertif;
       
      this.doSomething() ;
      if(this.dataCurrentArray!=null)
   {this.InitCertificat = this.dataCurrentArray.certificats;}
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
    
    this.competence={uid:"",type:type, competence:competence, competence_level:competence_level,tools:this.toolsArray }
  
    this.arrayListComp.push( this.competence);
    this.CompetenceVersion=this.arrayListComp;
   
  this.doSomething() ;
  if(this.dataCurrentArray!=null)
  {this.InitCompetence = this.dataCurrentArray.competences;}
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
  
    this.ProjetArray.push(projet);
    const expr= new Experience(fonction,location,emp,dateDebut,dateFin, this.ProjetArray);
    this.arrayListExp.push(expr);
    this.ExperienceVersion=this.arrayListLang;
    this.doSomething() ;
    if(this.dataCurrentArray!=null)
  {this.InitExperience = this.dataCurrentArray.experiences;}
  }
  changeColor(paint){
    this.ColorVersion=
    {FirstColor: paint.FirstColor, SecondColor: paint.SecondColor}
    this.doSomething();
  if(this.dataCurrentArray!=null)
    {this.FirstColorInit = this.dataCurrentArray.FirstColor;
    this.SecondColorInit= this.dataCurrentArray.SecondColor;
  }
  }
  
  onChange({editor}: ChangeEvent){
  
   this.AboutVersion=editor.getData();
   this.doSomething();
  }
  //select project descreption type
  LongDesc(){
    this.Short_Desc=false;
    this.Long_Desc=true;}
  ShortDesc(){
    this.Short_Desc=true;
    this.Long_Desc=false;
  }
  getFolders() {
    this.arrayListFolder=[];
    this.serviceVersion.getFolders().subscribe((data: Folder[]) => {
      this.listFolders = data;
  for(let key in this.listFolders){
   if(this.listFolders.hasOwnProperty(key)){
    this.listFolders[key].FID=key;
  
    this.arrayListFolder.push(this.listFolders[key]);
     //this.listFolders.push(this.listFolders[key]);
  }  
  }
  console.log('folder list',this.arrayListFolder);
  
  });
  }
  saveVersion(raison,statut,folder){
    console.log(folder);
      var capturedImage;var tempID="";
      this.template=localStorage.getItem("template");
      if(this.template=="temp2"){tempID="cv1";}
      else if(this.template=="temp1"){tempID="cv2";}
      console.log('canvas temp id',tempID)
      html2canvas(document.getElementById(tempID)).then(canvas => {
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
            FID:folder,
            temp:tempID,
             author:'Admin',
            reason:raison,
            statut:statut,
            dateVersion: dateTime ,
            concatVersion: this.contacts,
            aboutVersion: this.AboutVersion,
            personVersion:this.listPerson,
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
            profilePicture:this.localUrl,
            positionName:this.positionNameInit,positionEmail:this.positionEmailInit,positionTel:this.positionTelInit,
            positionAdress:this.positionAdressInit, positionLinkedin:this.positionLinkedinInit, positionAbout:this.positionAboutInit,
            positionFormation:this.positionFormationInit,positionCetificat:this.positionCertificatInit,positionCompetence:this.positionCompetenceInit,
            positionLangue:this.positionLangueInit,positionLoisirs:this.positionLoisirsInit,positionDivers:this.positionDiversInit,
            positionExperience:this.positionExperienceInit,positionImage:this.positionImageInit,positionArabeName:this.positionNameInit,
            positionGender:this.positionGenderInit 
      
      
      
      
        }
      
      
        this.serviceVersion.addVersion(this.version).subscribe();
        console.log('version',this.version);
      
      });
    
     
    
    }
  
  //save editing traces
  doSomething() {
      if (this.ColorVersion != null || this.AboutVersion!=null|| this.LangueVersion!=null
      ||this.DiversVersion!=null||this.LoisirsVersion!=null||this.ExperienceVersion!=null
      ||this.FormationVersion!=null||this.CertificatVersion!=null||this.CompetenceVersion!=null
      ||this.positionNameInit!=null
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
          formations:this.FormationVersion,certificats:this.CertificatVersion,competences:this.CompetenceVersion,
          positionName:this.positionNameInit,positionEmail:this.positionEmailInit,positionTel:this.positionTelInit,
          positionAdress:this.positionAdressInit, positionLinkedin:this.positionLinkedinInit, positionAbout:this.positionAboutInit,
          positionFormation:this.positionFormationInit,positionCetificat:this.positionCertificatInit,positionCompetence:this.positionCompetenceInit,
          positionLangue:this.positionLangueInit,positionLoisirs:this.positionLoisirsInit,positionDivers:this.positionDiversInit,
          positionExperience:this.positionExperienceInit,positionImage:this.positionImageInit,positionArabeName:this.positionNameInit,
          positionGender:this.positionGenderInit   }
  
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
          formations:this.FormationVersion,certificats:this.CertificatVersion,competences:this.CompetenceVersion,
          positionName:this.positionNameInit,positionEmail:this.positionEmailInit,positionTel:this.positionTelInit,
          positionAdress:this.positionAdressInit, positionLinkedin:this.positionLinkedinInit, positionAbout:this.positionAboutInit,
          positionFormation:this.positionFormationInit,positionCetificat:this.positionCertificatInit,positionCompetence:this.positionCompetenceInit,
          positionLangue:this.positionLangueInit,positionLoisirs:this.positionLoisirsInit,positionDivers:this.positionDiversInit,
          positionExperience:this.positionExperienceInit,positionImage:this.positionImageInit,positionArabeName:this.positionArabeNameInit,
          positionGender:this.positionGenderInit 
  
        }
        this.showUndo = true;
      }   
    } else {
      alert('Please type something.')
    }
   
  console.log('dosomething',this.dataCurrentArray);
  
    //this.test = 0;
  }
  
  //undo editing action
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
    console.log('current langue',this.dataCurrentArray.langues);
    this.InitLangue=[];this.InitLangue=this.dataCurrentArray.langues;
    console.log('init langue',this.InitLangue);
  
    this.InitLoisirs=[];this.InitLoisirs=this.dataCurrentArray.loisirs;
    this.InitAbout=[];this.InitAbout=this.dataCurrentArray.abouts;
  
    this.InitDivers=[];this.InitDivers=this.dataCurrentArray.divers;
    this.InitExperience=[];this.InitExperience=this.dataCurrentArray.experiences;
    this.InitFormation=[];this.InitFormation=this.dataCurrentArray.formations;
    this.InitCertificat=[];this.InitCertificat=this.dataCurrentArray.certificats;
    this.InitCompetence=[];this.InitCompetence=this.dataCurrentArray.competences;
  
    this.positionNameInit=[];this.positionNameInit=this.dataCurrentArray.positionName;document.getElementById("name").style.transform= this.positionNameInit;
     this.positionGenderInit=[];this.positionGenderInit=this.dataCurrentArray.positionGender;document.getElementById("gender").style.transform= this.positionGenderInit;
     this.positionImageInit=[];this.positionImageInit=this.dataCurrentArray.positionImage;document.getElementById("picture").style.transform= this.positionImageInit;
     this.positionArabeNameInit=[];this.positionImageInit=this.dataCurrentArray.positionArabeName;document.getElementById("arabicName").style.transform= this.positionArabeNameInit;
     this.positionAdressInit=[];this.positionAdressInit=this.dataCurrentArray.positionAdress;document.getElementById("adresse").style.transform= this.positionAdressInit;
     this.positionLinkedinInit=[];this.positionLinkedinInit=this.dataCurrentArray.positionLinkedin;document.getElementById("linkedin").style.transform= this.positionLinkedinInit;
     this.positionEmailInit=[];this.positionEmailInit=this.dataCurrentArray.positionEmail;document.getElementById("mail").style.transform= this.positionEmailInit;
     this.positionTelInit=[];this.positionTelInit=this.dataCurrentArray.positionTel;document.getElementById("tel").style.transform= this.positionTelInit;
     this.positionAboutInit=[];this.positionAboutInit=this.dataCurrentArray.positionAbout;document.getElementById("about").style.transform= this.positionAboutInit;
     this.positionFormationInit=[];this.positionFormationInit=this.dataCurrentArray.positionFormation;document.getElementById("formation").style.transform= this.positionFormationInit;
     this.positionCertificatInit=[];this.positionCertificatInit=this.dataCurrentArray.positionCetificat;document.getElementById("certificat").style.transform= this.positionCertificatInit;
     this.positionCompetenceInit=[];this.positionCompetenceInit=this.dataCurrentArray.positionCompetence;document.getElementById("competence").style.transform= this.positionCompetenceInit;
     this.positionLangueInit=[];this.positionLangueInit=this.dataCurrentArray.positionLangue;document.getElementById("langue").style.transform= this.positionLangueInit;
     this.positionLoisirsInit=[];this.positionLoisirsInit=this.dataCurrentArray.positionLoisirs;document.getElementById("loisir").style.transform= this.positionLoisirsInit;
     this.positionDiversInit=[];this.positionDiversInit=this.dataCurrentArray.positionDivers;document.getElementById("divers").style.transform= this.positionDiversInit;
     this.positionExperienceInit=[];this.positionExperienceInit=this.dataCurrentArray.positionExperience;document.getElementById("projet").style.transform= this.positionExperienceInit;
  
  
      
  
  }
  //redo editing action
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
    console.log('redo',this.InitCompetence)
    this.FirstColorInit = this.dataCurrentArray.FirstColor;
    this.SecondColorInit= this.dataCurrentArray.SecondColor;
    this.InitAbout=[];this.InitAbout=this.dataCurrentArray.abouts;
    this.InitLangue=[];this.InitLangue=this.dataCurrentArray.langues;
    this.InitLoisirs=[];this.InitLoisirs=this.dataCurrentArray.loisirs;
    this.InitDivers=[];this.InitDivers=this.dataCurrentArray.divers;
    this.InitExperience=[];this.InitExperience=this.dataCurrentArray.experiences;
    this.InitFormation=[];this.InitFormation=this.dataCurrentArray.formations;
    this.InitCertificat=[];this.InitCertificat=this.dataCurrentArray.certificats;
    this.InitCompetence=[];this.InitCompetence=this.dataCurrentArray.competences;
    this.positionNameInit=[];this.positionNameInit=this.dataCurrentArray.positionName;document.getElementById("name").style.transform= this.positionNameInit;
    this.positionGenderInit=[];this.positionGenderInit=this.dataCurrentArray.positionGender;document.getElementById("gender").style.transform= this.positionGenderInit;
    this.positionImageInit=[];this.positionImageInit=this.dataCurrentArray.positionImage;document.getElementById("picture").style.transform= this.positionImageInit;
    this.positionImageInit=[];this.positionImageInit=this.dataCurrentArray.positionArabeName;document.getElementById("arabicName").style.transform= this.positionArabeNameInit;
    this.positionAdressInit=[];this.positionAdressInit=this.dataCurrentArray.positionAdress;document.getElementById("adresse").style.transform= this.positionAdressInit;
    this.positionLinkedinInit=[];this.positionLinkedinInit=this.dataCurrentArray.positionLinkedin;document.getElementById("linkedin").style.transform= this.positionLinkedinInit;
    this.positionEmailInit=[];this.positionEmailInit=this.dataCurrentArray.positionEmail;document.getElementById("mail").style.transform= this.positionEmailInit;
    this.positionTelInit=[];this.positionTelInit=this.dataCurrentArray.positionTel;document.getElementById("tel").style.transform= this.positionTelInit;
    this.positionAboutInit=[];this.positionAboutInit=this.dataCurrentArray.positionAbout;document.getElementById("about").style.transform= this.positionAboutInit;
    this.positionFormationInit=[];this.positionFormationInit=this.dataCurrentArray.positionFormation;document.getElementById("formation").style.transform= this.positionFormationInit;
    this.positionCertificatInit=[];this.positionCertificatInit=this.dataCurrentArray.positionCetificat;document.getElementById("certificat").style.transform= this.positionCertificatInit;
    this.positionCompetenceInit=[];this.positionCompetenceInit=this.dataCurrentArray.positionCompetence;document.getElementById("competence").style.transform= this.positionCompetenceInit;
    this.positionLangueInit=[];this.positionLangueInit=this.dataCurrentArray.positionLangue;document.getElementById("langue").style.transform= this.positionLangueInit;
    this.positionLoisirsInit=[];this.positionLoisirsInit=this.dataCurrentArray.positionLoisirs;document.getElementById("loisir").style.transform= this.positionLoisirsInit;
    this.positionDiversInit=[];this.positionDiversInit=this.dataCurrentArray.positionDivers;document.getElementById("divers").style.transform= this.positionDiversInit;
    this.positionExperienceInit=[];this.positionExperienceInit=this.dataCurrentArray.positionExperience;document.getElementById("projet").style.transform= this.positionExperienceInit;
  
  }
  
  
  show(){
    console.log('show');
    if(this.showAdresse){this.showAdresse=false;}
    else{this.showAdresse=true;}
  
  }
}