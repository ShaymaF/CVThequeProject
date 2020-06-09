import { Component, OnInit, ElementRef, Version } from '@angular/core';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { CKEditorComponent, ChangeEvent } from '@ckeditor/ckeditor5-angular';

import { AboutService } from '../services/about/about.service';
import { saveAs } from 'file-saver';
import * as wkhtmltopdf  from 'wkhtmltopdf';
import * as jsPDF from 'jspdf';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
import html2canvas from 'html2canvas';
import { FileUploader,FileSelectDirective } from 'ng2-file-upload';
import { LanguesService } from '../services/langues/langues.service';
import { Langue } from '../models/langues';
import { Tools, Competence } from '../models/competence';
import { Projet, Experience } from '../models/experience';
import { Certificat } from '../models/certificat';
import { Loisirs } from '../models/loisirs';
import { Divers } from '../models/divers';
import { Formation } from '../models/formation';
import { CertificatService } from '../services/Certificat/certificat.service';
import { DiversService } from '../services/divers/divers.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../services/contact/contact.service';
import { FormationService } from '../services/formation/formation.service';
import { ExperienceService } from '../services/experience/experience.service';
import { LoisirService } from '../services/loisirs/loisir.service';
import { CompetenceService } from '../services/competence/competence.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { VersionService } from '../services/version/version.service';
import { ImagesService } from '../services/images/images.service';
import { TempService } from '../services/temp/temp.service';
import { Temp } from '../models/temp';
import { Contact } from '../models/contact';
import { Traces, ChartColors } from '../models/Traces';
import { Pdf } from '../models/person';
import { PersonService } from '../services/person/person.service';
import { Person } from '../models/person';
const uploadAPI = 'http://localhost:8080/api/upload';
declare var require: any
const FileSaver = require('file-saver');
 var xepOnline: any;
@Component({
  selector: 'app-edition-cv2',
  templateUrl: './edition-cv2.component.html',
  styleUrls: ['./edition-cv2.component.css']
})
export class EditionCv2Component implements OnInit {
  public Editor= InlineEditor;
//text="bonjour";
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
formations:any;

HtmlContent: any;
ColorVersion:ChartColors;AboutVersion:any;LangueVersion:Langue[];LoisirsVersion:Loisirs[];
DiversVersion:Divers[];ExperienceVersion:Experience[];FormationVersion:Formation[];
CertificatVersion:Certificat[];CompetenceVersion:Competence[];




public backgroundColor: string;public fontColor: string;public linkColor: string;

url:any;
urlExist: boolean=false;
toppings = new FormControl();

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

constructor(private aboutService: AboutService,public translate: TranslateService,
  private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService,
  private toastr: ToastrService, private langueService :LanguesService
  , private diversService : DiversService, private loisirsService :LoisirService,
  private certificatService : CertificatService, private competenceService : CompetenceService,
  private serviceVersion: VersionService,private http: HttpClient,private formBuilder: FormBuilder,
  
  private el: ElementRef, private imagesService: ImagesService,private storage: AngularFireStorage,
  private tempService: TempService,private personService:PersonService) {

    console.log('thi',this.InitLangue);

     //this.InitLangue.splice(0, length);
    // console.log('thi',this.InitLangue);
   // this.InitLangue=JSON.parse(localStorage.getItem('InitLangue'));
   // this.arrayListLang=this.arrayListLang.concat(JSON.parse(localStorage.getItem('arrayListLang')).filter((item) => this.arrayListLang.indexOf(item) < 0));

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
   console.log('init+array',this.InitLangue,this.arrayListLang);
this.getPerson();
   //this.InitLangue=Object.assign({}, JSON.parse(localStorage.getItem('InitLangue')));
   //this.arrayListLang=Object.assign({}, JSON.parse(localStorage.getItem('arrayListLang')));


    //console.log('after init+array',this.InitLangue,this.arrayListLang);
    //console.log( 'localstorage init', JSON.parse(localStorage.getItem('InitLangue')));
    //console.log( 'localstorage array', JSON.parse(localStorage.getItem('arrayListLang')));
    //console.log('after2 init+array',this.InitLangue,this.arrayListLang);
    //console.log('after2 init+array',this.InitLangue,this.InitLangue);

  }
  getPerson()  {
    this.personService.getOnePerson(localStorage.getItem("collabId")).subscribe((data: Person[]) => {
      this.listPerson = data;
      this.arrayListPerson = data;
  console.log('personn',this.listPerson);
 
    });  
  }
  getAllLangues()  {

    this.langueService.getLangues().subscribe((data: Langue[]) => {
    this.listLangues = data;
  
  for(let key in this.listLangues){
   if(this.listLangues.hasOwnProperty(key)){
   //  this.listLangues[key].id=key;
   this.arrayListLang.push(this.listLangues[key]);
   this.InitLangue.push(this.listLangues[key]);

 
 // else{
  
 // }

  }
  
  }
 /* if(!localStorage.getItem("InitLangue")){
    localStorage.setItem('InitLangue',JSON.stringify(this.InitLangue) );  }
 if(!localStorage.getItem('arrayListLang'))
  {
    localStorage.setItem('arrayListLang',JSON.stringify(this.arrayListLang) );

  }*/
    });  
  
  }
  getAllAbouts() {
    this.aboutService.getAbout().subscribe(data => {
   this.InitAbout=data;
   //this.dataCurrentArray.abouts=this.InitAbout;
    //this.AboutVersion=this.InitAbout;
  
     //console.log('AboutVersion',this.AboutVersion);
    // console.log('InitAbout',this.dataCurrentArray);
  
    //  this.abouts= data;
  });
  }
  getAllLoisirs() {
    this.loisirsService.getLoisirs().subscribe((data: Loisirs[]) => {
      this.listLoisirs = data;
  for(let key in this.listLoisirs){
   if(this.listLoisirs.hasOwnProperty(key)){
   // this.listLoisirs[key].id=key;
  
    this.arrayListLoisirs.push(this.listLoisirs[key]);
    this.InitLoisirs.push(this.listLoisirs[key]);
  
  }
  }
    });  
  }
  getAllContacts() {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
     this.listContact= data;
     for(let key in this.listContact){
      if(this.listContact.hasOwnProperty(key)){
       this.listContact[key].id=key;
     
       this.arrayListCantact.push(this.listContact[key]);
       this.InitContact.push(this.listContact[key]);
       console.log('contact',this.InitContact);
     
     }
     }
  });
  }
  
  
  getAllDivers() {
    this.diversService.getDivers().subscribe((data: Loisirs[]) => {
      this.listDivers = data;
  for(let key in this.listDivers){
   if(this.listDivers.hasOwnProperty(key)){
   // this.listDivers[key].id=key;
  
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
  //  this.listCertif[key].id=key;
  
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
  //  this.listFormation[key].id=key;
  
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
  //  this.listComp[key].id=key;
    this.arrayListComp.push(this.listComp[key]);
    this.InitCompetence.push(this.listComp[key]);
    console.log('competence list',this.arrayListComp);
  
  //console.log('tool list',this.InitCompetence.tools);
  
      
  
  }
  }
    });  
  }
  addLangue(langue,note){
    //this.isSubmitted = true;
  
      
        this.langue={ id:"key",langue:langue, note: note}
      //  this.langueService.addLangue(this.langue).subscribe();
        this.arrayListLang.push( this.langue);
        this.InitLangue.push( this.langue);
       // this.LangueVersion=this.arrayListLang;
     //  this.doSomething() ;
    // console.log(' this.langue',   this.langue)

   //  console.log('this.InitLangue',  this.InitLangue)

   //  console.log(' this.arrayListLang',   this.arrayListLang)

    // console.log( 'localstorage init', JSON.parse(localStorage.getItem('InitLangue')));
    // console.log( 'localstorage array', JSON.parse(localStorage.getItem('arrayListLang')));
    // localStorage.setItem('InitLangue',JSON.stringify(this.InitLangue) ); 
    // localStorage.setItem('arrayListLang',JSON.stringify(this.arrayListLang) ); 

    // this.InitLangue=JSON.parse(localStorage.getItem('langues'));


  
  }
public downloadPDF() {
   const doc = new jsPDF();

   const specialElementHandlers = {
      '#editor': function (element, renderer) {
       return true;
       }
   };

   const content = document.getElementById('cv');

   doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
     'elementHandlers': specialElementHandlers
   });

   doc.save('test.pdf');
}
public pdf(){
  this.pdfHtml1=document.getElementById("cv").innerHTML;
  this.linkCSS='https://firebasestorage.googleapis.com/v0/b/cvthequepfe.appspot.com/o/temp2.css?alt=media&token=dae2afc6-7b02-49ac-94a4-7de1885c179b';
  this.pdfHtml=this.linkCSS+ this.pdfHtml1;
  console.log(this.pdfHtml);

  this.html ={ "html":this.pdfHtml};
 
this.aboutService.download(this.html).subscribe();
    
}
sendImage() {
  console.log(document.getElementById("cv").innerHTML);
  console.log(document.getElementById("cv").style);


}
/*sendImage( ){
  console.log('ok');
  let element = document.getElementById("cv");
 
  html2canvas(element).then(function(canvas) {
    canvas.height=500;
    canvas.width=200;

      // Convert the canvas to blob
      canvas.toBlob(function(blob){
          // To download directly on browser default 'downloads' location
          let link = document.createElement("a");
          link.download = "image.png";
          link.href = URL.createObjectURL(blob);
          link.click();

          // To save manually somewhere in file explorer
        //  window.saveAs(blob, 'image.png');

      },'image/png');
  });
}
*/
changePersonalInfo(e,id){

  if(e.target.checked){
    console.log(id,'checked');
    document.getElementById(id).style.display="unset";
  }
  else{
    console.log(id,'unchecked');

    document.getElementById(id).style.display="none";

  }
}
onLangueChange(e,id,langue) {
  console.log('uncheked1',e);

  if(e.target.checked){
    // do something here
    this.InitLangue.push(langue);

  }
  else{
    console.log('uncheked');
     // do something here
     //console.log('id',langue._id);
     this.InitLangue.splice(langue,1);
     console.log('InitLangue',this.InitLangue);

  }
}
onLoisirsChange(e,id,loisirs) {
  console.log('uncheked1',e);

  if(e.target.checked){
    // do something here
    this.InitLoisirs.push(loisirs);

  }
  else{
    console.log('uncheked');
     // do something here
     this.InitLoisirs.splice(loisirs.desc,1);

  }
}

onFormationChange(e,id,formation) {
  console.log('uncheked1',e);

  if(e.target.checked){
    // do something here
    this.InitFormation.push(formation);

  }
  else{
    console.log('uncheked');
     // do something here
     this.InitFormation.splice(formation.certification,1);

  }
}
onExperienceChange(e,id,experience){
  if(e.target.checked){
    // do something here
    this.InitExperience.push(experience);

  }
  else{
    console.log('uncheked');
     // do something here
     this.InitExperience.splice(experience,1);

  }
}
onCertificatChange(e,id,certif) {
  console.log('uncheked1',e);

  if(e.target.checked){
    // do something here
    this.InitCertificat.push(certif);

  }
  else{
    console.log('uncheked');
     // do something here
     this.InitCertificat.splice(certif,1);

  }
}
onCompetenceChange(e,id,cmp) {
  console.log('uncheked1',e);

  if(e.target.checked){
    // do something here
    this.InitCompetence.push(cmp);

  }
  else{
    console.log('uncheked');
     // do something here
     this.InitCompetence.splice(cmp.id,1);

  }
}
increase(note,langue){
  var i=this.InitLangue.indexOf(langue);
  console.log(i);
  this.InitLangue[i].note=note++;
  this.arrayListLang[i].note=note--;

  console.log(this.InitLangue[i].note);

}
decrease(note,langue){
  var i=this.InitLangue.indexOf(langue);
  console.log(i);
  this.InitLangue[i].note=note--;
  this.arrayListLang[i].note=note--;
  console.log(this.InitLangue[i].note);
}
decreaseComp(note,cmp){
  var i=this.InitLangue.indexOf(cmp);
  console.log(i);
  this.InitCompetence[i].note=note--;
  this.arrayListComp[i].note=note--;
  console.log(this.InitLangue[i].note);
}

increaseComp(note,cmp){
  var i=this.InitLangue.indexOf(cmp);
  console.log(i);
  this.InitCompetence[i].note=note++;
  this.arrayListComp[i].note=note--;

  console.log(this.InitLangue[i].note);

}
onCantactChange(e,id,cmp) {
  console.log('uncheked1',e);

  if(e.target.checked){
    // do something here
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
  console.log(loisir);
  this.loisirs={id:"key", desc:loisir}

  this.arrayListLoisirs.push (this.loisirs);
  this.InitLoisirs.push(this.loisirs);

  this.doSomething() ;

}
  addDivers(){
    this.isSubmitted = true;

    if (this.formDivers.valid) {

    //this.divers={id: 'key', desc:desc}
    this.diversService.addDivers(this.formDivers.value).subscribe();
    this.arrayListDivers=[];
    this.InitDivers=[];

    this.DiversVersion=this.arrayListDivers;
    this.doSomething() ;
    }
  }
  addFormation(University,certification,start_date,end_date,diplome_date){

    this.formation={id:"key", University:University, certification: certification,start_date:start_date,
    end_date:end_date,diplome_date:diplome_date}
    this.formationService.addFormation(this.formation).subscribe();
    this.arrayListFormation=[];
    this.InitFormation=[];
    this.getAllFormation();
    this.FormationVersion=this.arrayListFormation;
    this.doSomething() ;
    }
    addCertificat(centre,certification,diplome_date,start_date,end_date){
      this.certificat={ id:"key",centre:centre, certification: certification,start_date:start_date,
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

inlineStyle(){
  var elem = document.getElementById("cv");
  var style = window.getComputedStyle ? getComputedStyle(elem) : elem.style;
  if (style) { // This will be true on major browsers
      console.log(style);// Or whatever
  }
}
}