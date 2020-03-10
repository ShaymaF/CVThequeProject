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
@Component({
  selector: 'app-edition-cv',
  templateUrl: './edition-cv.component.html',
  styleUrls: ['./edition-cv.component.css']
})
export class EditionCVComponent implements OnInit {

  objectKeys :any;
  abouts:any;
  formations:any;
  contacts:any;
  listExperiences: Experience[];
  emps: Experience[] = [];
  arrayListExp = [];

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

constructor(private aboutService :AboutService, private formationService :FormationService ,
  private contactService :ContactService, private experienceService :ExperienceService){
this.getAllAbouts();
this.getAllContacts();
this.getAllFormations();
//this.getAllExperiences();
}
/*getAllExperiences() {
  this.experienceService.getExperience().subscribe(data => {
   this.experiences= data;
   console.log('exp ',this.experiences);
   
});
}*/
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
getAllFormations() {
  this.formationService.getFormation().subscribe((data: Formation[]) => {
    this.formations = data;
    console.log('formationss',this.formations);
    });


}
  ngOnInit() {
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

}