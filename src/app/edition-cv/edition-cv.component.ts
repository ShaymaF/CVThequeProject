import { Component, OnInit ,EventEmitter, Input } from '@angular/core';

import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { AboutService } from '../services/about/about.service';
import { FormationService } from '../services/formation/formation.service';
import { Formation } from '../models/formation';
@Component({
  selector: 'app-edition-cv',
  templateUrl: './edition-cv.component.html',
  styleUrls: ['./edition-cv.component.css']
})
export class EditionCVComponent implements OnInit {

 
  abouts:any;
  formations:any;
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

constructor(private aboutService :AboutService, private formationService :FormationService ){
this.getAllAbouts();
this.getAllFormations();
}
getAllAbouts() {
  this.aboutService.getAbout().subscribe(data => {
   this.abouts= data;
});
}
getAllFormations() {
  this.formationService.getFormation().subscribe((data: Formation[]) => {
    this.formations = data;
    console.log('formationss',this.formations);
    });


}
  ngOnInit() {
    /*this.aboutService.getAbout().subscribe((data: About[]) => {
    this.abouts = data;
    console.log('aboutsss',this.abouts);
    });
 

      });*/
  }
}
