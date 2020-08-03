import { Component, OnInit ,Input,ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { filter, take } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import { CdkDragEnd } from "@angular/cdk/drag-drop";

import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import { Template } from 'src/app/shared/models/template';
import { AuthService } from 'src/app/shared/services/_auth/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage/token-storage.service';
import { TempService } from 'src/app/shared/services/temp/temp.service';


var data;
@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})
export class ListTemplateComponent implements OnInit {
  opts:any;
  //@ViewChild('host',opts) hostComponent;
  @ViewChild('host',{ static: true }) hostComponent;
  elt:Element=null;
   fileContent;
  template:Template;
 code:any;codeEditor;
  name="shayma fradi";
about=`<div class="content"(cdkDragEnded)="dragAbout($event)" cdkDrag id="about">

<div class="Apropos">
       
       <ckeditor [editor]="Editor" data= 'hello'</ckeditor>
   
</div>
</div>`;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router,private tempService:TempService) {
   }

  ngOnInit() {
    sessionStorage.setItem("data","")

  data="";
    document.getElementById("html").hidden=true;
    document.getElementById("view").hidden=false;

    //this.code="<h3>hello world</h3>";

    this.codeEditor = CodeMirror.fromTextArea(this.hostComponent.nativeElement, { 
     // lineNumbers: true,
     // extraKeys: {"Ctrl-Space": "autocomplete"}, 
     // mode: { name: 'html', globalVars: true }
     lineNumbers: true,
     mode: { name: 'htmlmixed', globalVars: true },
     theme: 'material',
     extraKeys: {"Ctrl-Space": "autocomplete"}
    });

    this.codeEditor.on('change', (editor: CodeMirror.Editor) => {
      document.getElementById("view").innerHTML=editor.getDoc().getValue();
    });



    let orig = CodeMirror.hint.html;
    CodeMirror.hint.html = function(cm) {
      var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
      inner.list.push("bozo");
      return inner;
    };

  
  }  
  showHtml(){

    document.getElementById("view").hidden=true;
    document.getElementById("html").hidden=false;

  }
  showView(){

    document.getElementById("html").hidden=true;
    document.getElementById("view").hidden=false;

  }
  Clickabout(){
    data=`<ckeditor [editor]="Editor" [(ngModel)="InitAbout"></ckeditor>`

  }
  clickComp(){
    data=`<div *ngFor="let cp of InitCompetence">

       <a>{{cp.competence}}</a>`;
  }
  clickCompNote(){
    data= `   <a>{{cp.note}}</a>
       </div>`;
       
  }

  clickLangue(){
    data=` <div *ngFor="let c of InitLangue">
                    

        <a>{{c.langue}}</a>`;
  }
  clickLangueNote(){
    data= ` <a>{{c.note}}</a>
       </div>`;
       
  }
delete(){
  data='';
}
  Clickdivers(){
    data= ` <div *ngFor="let f of InitDivers">
    <ckeditor [editor]="Editor" [(ngModel)]="f.desc"></ckeditor>
    
    </div>  ` 
  }
  Clickloisirs(){
    data= ` <div *ngFor="let l of InitLoisirs">

    <a>{{l.desc}}</a>
      
    </div>    ` 

  }
  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
  let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
   // console.log("self.fileContent",self.fileContent);
    document.getElementById("view").innerHTML=self.fileContent;
    self.codeEditor.setValue(self.fileContent);
    self.template={html:self.fileContent,TID:"1"}

    }
    fileReader.readAsText(file);
    self.code=self.fileContent;
  }
  onCodeChanged(value) {
    this.code=value;
  }
  save(){
    console.log('template',this.template);
    this.tempService.addTemp(this.template).subscribe();
  }
  event(event){
    //his.code=document
             document.getElementById('view').style.cursor='copy';
            document.getElementById("code");
    console.log('event',event);
    document.onclick=e=>{
      console.log(e.target);
      console.log(event.target.innerText);
     // event.target.outerHTML=+'<a>{{name}}</a>';
      event.target.innerHTML=data;
    

      

    //  var d=e.target.;
     //this.elt=e.target;
      //var span = d.querySelector('span');
     // console.log(span.innerText);
  
  
  
    }
  }
 
  dragAbout(event){
    /*console.log('event',event);
        console.log('y',event.distance.y);
     console.log('parent element',document.getElementById("about").lastChild);
    var d = document.getElementById('about');
    d.style.position = "absolute";
d.style.left = event.distance.x;
d.style.top = event.distance.y;
  */
  document.onclick=e=>{
    console.log(e.target);
    console.log(event.target.innerText);

  //  var d=e.target.;
   //this.elt=e.target;
    //var span = d.querySelector('span');
   // console.log(span.innerText);



  }
}
}
