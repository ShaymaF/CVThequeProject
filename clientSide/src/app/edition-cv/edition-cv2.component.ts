import { Component, OnInit, ElementRef, Version } from '@angular/core';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {  ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { from, Subscription } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { ActivatedRoute } from '@angular/router';
import { Pdf, Person } from '../shared/models/person';
import { Experience, Projet } from '../shared/models/experience';
import { Temp } from '../shared/models/temp';
import { Langue } from '../shared/models/langues';
import { Divers } from '../shared/models/divers';
import { Loisirs } from '../shared/models/loisirs';
import { Formation } from '../shared/models/formation';
import { Certificat } from '../shared/models/certificat';
import { Competence, Tools } from '../shared/models/competence';
import { Contact } from '../shared/models/contact';
import { Traces, ChartColors } from '../shared/models/Traces';
import { AboutService } from '../shared/services/about/about.service';
import { FormationService } from '../shared/services/formation/formation.service';
import { ContactService } from '../shared/services/contact/contact.service';
import { ExperienceService } from '../shared/services/experience/experience.service';
import { LanguesService } from '../shared/services/langues/langues.service';
import { DiversService } from '../shared/services/divers/divers.service';
import { CertificatService } from '../shared/services/Certificat/certificat.service';
import { CompetenceService } from '../shared/services/competence/competence.service';
import { LoisirService } from '../shared/services/loisirs/loisir.service';
import { ImagesService } from '../shared/services/images/images.service';
import { PersonService } from '../shared/services/person/person.service';
import { TempService } from '../shared/services/temp/temp.service';
import { VersionService } from '../shared/services/version/version.service';

@Component({
  selector: 'app-edition-cv2',
  templateUrl: './edition-cv2.component.html',
  styleUrls: ['./edition-cv2.component.css']
})
export class EditionCv2Component implements OnInit {

public Editor= InlineEditor;profil;template;
positionX:string;positionY:string;showPopup;positionXInit=null;positionYInit=null;
positionNameInit=null;positionEmailInit=null;positionTelInit=null;positionAdressInit=null;positionLinkedinInit=null;
positionAboutInit=null;positionFormationInit=null;positionCertificatInit=null;positionCompetenceInit=null;
positionLangueInit=null;positionLoisirsInit=null;positionDiversInit=null;positionExperienceInit=null;
positionImageInit=null;positionArabeNameInit=null;positionGenderInit=null;
image:any;
pdfHtml:any;pdfHtml1:any;
linkCSS:string;
abouts:any;html:Pdf;
exp: Experience;
contacts:any;
version: Version;temp: Temp;person:Person;
langue:Langue;divers:Divers;loisirs:Loisirs;experience:Experience;formation:Formation;certificat:Certificat;competence:Competence;
index=0;
toolsArray:Tools[] = []; ProjetArray:Projet[]=[];projet:Projet;
tool:Tools;listOrga:any[];arrayListOrga=[];
listExperiences: any[];listProjet: Projet[];listLangues: Langue[];listLoisirs: Loisirs[];listDivers: Divers[];listFormation: Formation[];
listCertif: Certificat[];listComp: Competence[];listContact: Contact[];listPerson: Person[];
style:any;currentStyle:any;
InitAbout=null;InitLangue=[];InitPerson=[];InitContact=[];InitDivers=[];InitLoisirs=[];InitExperience=[];InitFormation=[];InitCertificat=[];InitCompetence=[];
arrayListExp :Experience[] = [];arrayListProjet=[];arrayListPerson=[];arrayListLang=[];arrayListDivers=[];arrayListLoisirs=[];arrayListFormation=[];
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
ColorVersion:ChartColors;AboutVersion:any;LangueVersion:Langue[];LoisirsVersion:Loisirs[];
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


constructor(private aboutService: AboutService,
  private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService,
  private toastr: ToastrService, private langueService :LanguesService
  , private diversService : DiversService, private loisirsService :LoisirService,
  private certificatService : CertificatService, private competenceService : CompetenceService,
  private serviceVersion: VersionService,private http: HttpClient,private formBuilder: FormBuilder,
  private el: ElementRef, private imagesService: ImagesService,private storage: AngularFireStorage,
  private tempService: TempService,private personService:PersonService,private route: ActivatedRoute) {

  
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

  ngOnInit() {
    //get template id from query params
this.route.queryParams.subscribe(params => {
  this.template=params.url
});

    this.chartColor=[
      
      {FirstColor: '#008b8b', SecondColor: '#017777'},
      {FirstColor: '#f0ca68', SecondColor: '#b88709'},
      {FirstColor: '#62382f', SecondColor: '#4d261e'},
      {FirstColor: '#c97545', SecondColor: '#8c451c'},
      {FirstColor: '#c1800b', SecondColor: '#805406'},
      
  ];

 
  

  
  //use selected template
  if(this.template==null){
    this.template=localStorage.getItem("template");
    if(this.template=="temp2"){document.getElementById("cv1").style.display="inherit";}
    else if(this.template=="temp1"){document.getElementById("cv2").style.display="inherit";}
  }
  else
  {
    document.getElementById("cv1").innerHTML=this.template;
    document.getElementById("cv1").style.display="inherit";
  }

    // get selected profil
    this.profil=localStorage.getItem("collabId");
    this.getPerson();
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
    //initial position of draged elements
   this.positionNameInit=document.getElementById("name").style.transform;
   this.positionArabeNameInit=document.getElementById("arabicName").style.transform;
   this.positionGenderInit=document.getElementById("gender").style.transform;
   this.positionImageInit=document.getElementById("picture").style.transform;
   this.positionAdressInit=document.getElementById("adresse").style.transform;
   this.positionTelInit=document.getElementById("tel").style.transform;
   this.positionEmailInit=document.getElementById("mail").style.transform;
   this.positionLinkedinInit=document.getElementById("linkedin").style.transform;
   this.positionAboutInit=document.getElementById("about").style.transform;
   this.positionCertificatInit=document.getElementById("certificat").style.transform;
   this.positionFormationInit=document.getElementById("formation").style.transform;
   this.positionCompetenceInit=document.getElementById("competence").style.transform;
   this.positionLangueInit=document.getElementById("langue").style.transform;
   this.positionLoisirsInit=document.getElementById("loisir").style.transform;
   this.positionDiversInit=document.getElementById("divers").style.transform;
   this.positionExperienceInit=document.getElementById("projet").style.transform;
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
  //return person informations
  getPerson()  {
    this.personService.getOnePerson(localStorage.getItem("collabId")).subscribe((data: Person[]) => {
      this.listPerson = data;
      this.arrayListPerson = data;
  console.log('personn',this.listPerson);
  //console.log(this.profil=this.listPerson[8]);

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

  getAllLangues()  {

    this.langueService.getLangues(this.profil).subscribe((data: Langue[]) => {
    this.listLangues = data;
  
  for(let key in this.listLangues){
   if(this.listLangues.hasOwnProperty(key)){
   this.arrayListLang.push(this.listLangues[key]);
   this.InitLangue.push(this.listLangues[key]);
  }
  
  }
  this.LangueVersion=this.InitLangue;

    });  
  
  }
    //return person about section

  getAllAbouts() {
    this.aboutService.getAbout(this.profil).subscribe(data => {
   this.InitAbout=data;
   this.dataCurrentArray.abouts=this.InitAbout;
 
  });
  }
    //return loisirs informations

  getAllLoisirs() {
    this.loisirsService.getLoisirs(this.profil).subscribe((data: Loisirs[]) => {
      this.listLoisirs = data;
      for(let key in this.listLoisirs){
        if(this.listLoisirs.hasOwnProperty(key)){
        //  this.listLangues[key].id=key;
        this.arrayListLoisirs.push(this.listLoisirs[key]);
        this.InitLoisirs.push(this.listLoisirs[key]);

       }
       
       }
       this.LoisirsVersion=this.InitLoisirs;
     
         });  
        }
          //return contacts informations

  getAllContacts() {
    this.contactService.getContacts(this.profil).subscribe((data: Contact[]) => {
     this.listContact= data;
     for(let key in this.listContact){
      if(this.listContact.hasOwnProperty(key)){
       this.listContact[key].uid=key;
     
       this.arrayListCantact.push(this.listContact[key]);
       this.InitContact.push(this.listContact[key]);
     
     }
     }

  });
  }
    //return person divers section
 
  getAllDivers() {
    this.diversService.getDivers(this.profil).subscribe((data: Divers[]) => {
      this.listDivers = data;
  for(let key in this.listDivers){
   if(this.listDivers.hasOwnProperty(key)){
 
    this.arrayListDivers.push(this.listDivers[key]);
    this.InitDivers.push(this.listDivers[key]);
  
  }
  }
  this.DiversVersion=this.InitDivers;

    });  
  }
    //return person certificats

  getAllCertificats() {
    this.certificatService.getCertificat(this.profil).subscribe((data: Certificat[]) => {
      this.listCertif = data;
  for(let key in this.listCertif){
   if(this.listCertif.hasOwnProperty(key)){ 
    this.arrayListCertif.push(this.listCertif[key]);
    this.InitCertificat.push(this.listCertif[key]);
  
  }
  }
  this.CertificatVersion=this.InitCertificat;

    });  
  }
    //return person experiences

  getAllExperiences() {
    this.experienceService.getExperience(this.profil).subscribe((data: Experience[]) => {
      this.listExperiences = data;
  for(let key in this.listExperiences){
   if(this.listExperiences.hasOwnProperty(key)){
    this.listExperiences[key].id=key;
  
    this.arrayListExp.push(this.listExperiences[key]);
    this.InitExperience.push(this.listExperiences[key]);
  
   }
  }
  this.ExperienceVersion=this.InitExperience;

    });  
  }
    //return organistation list 

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
      //return projects list 

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
      //return person academic formation list 

  getAllFormation() {
    this.formationService.getFormation(this.profil).subscribe((data: Formation[]) => {
      this.listFormation = data;
  for(let key in this.listFormation){
   if(this.listFormation.hasOwnProperty(key)){
  //  this.listFormation[key].id=key;
  
    this.arrayListFormation.push(this.listFormation[key]);
    this.InitFormation.push(this.listFormation[key]);
  
  }
  }
  this.FormationVersion=this.InitFormation;

    });  
  }
        //return person skills list 

  getAllCompetence() {
    this.competenceService.getCompetence(this.profil).subscribe((data: Competence[]) => {
      this.listComp = data;
  
  for(let key in this.listComp){
   if(this.listComp.hasOwnProperty(key)){
    this.arrayListComp.push(this.listComp[key]);
    this.InitCompetence.push(this.listComp[key]);
      }
  }
  this.CompetenceVersion=this.InitCompetence;

    });  
  }
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
  this.pdfHtml1=document.getElementById("html").innerHTML;
 this.linkCSS=' <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"><link href="https://firebasestorage.googleapis.com/v0/b/cvthequepfe.appspot.com/o/temp2.css?alt=media&token=dae2afc6-7b02-49ac-94a4-7de1885c179b" rel="stylesheet" type="text/css" />';
//this.linkCSS='<link href="https://firebasestorage.googleapis.com/v0/b/cvthequepfe.appspot.com/o/styleCv1.css?alt=media&token=120c3990-ec8c-4583-9efa-20a6444acda1" rel="stylesheet" type="text/css" />';

this.pdfHtml=this.linkCSS+''+ this.pdfHtml1;
  console.log(this.pdfHtml);

  this.html ={"html":this.pdfHtml};
 
this.aboutService.download(this.html).subscribe();
    
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
  this.InitAbout=this.dataCurrentArray.abouts;
  console.log('current langue',this.dataCurrentArray.langues);
  this.InitLangue=[];this.InitLangue=this.dataCurrentArray.langues;
  console.log('init langue',this.InitLangue);

  this.InitLoisirs=[];this.InitLoisirs=this.dataCurrentArray.loisirs;
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
  this.InitAbout=this.dataCurrentArray.abouts;
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