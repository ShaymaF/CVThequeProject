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
       
       <ckeditor [editor]="Editor" data= '<p id ="id1">Développeur front end, j’ai travaillé sur des sujets passionnants et challengeant autour des technologies Front end dans les domaine de bancaire, service RH et Télécommunication et les applicationmobile d’entreprise.
   
    Cela fait 5 ans que j’interviens sur des projets en tant que Solution Builder ce qui m’a permis d’acquérir de
        bonnes compétences dans la conception, l’architecture, le développement en équipe, ainsi que savoir être
        à l’écoute du client durant les différentes étape des projets, s’appuyant souvent sur la méthodologie Agile.
  
     Aujourd’hui mon rôle de lead développeur me permet de continuer de m’épanouir au travers de
      nouveasux défis humaissns et technique.
   '></ckeditor>
   
</div>
</div>`;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router,private tempService:TempService) {
   }

  ngOnInit() {
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
  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
  let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
   // console.log("self.fileContent",self.fileContent);
    document.getElementById("view").innerHTML=self.fileContent;
    self.codeEditor.setValue(self.fileContent);

    }
    fileReader.readAsText(file);
    self.code=self.fileContent;

    //this.template={html:self.fileContent,TID:""}
    //this.tempService.addTemp(this.template);
    
  }
  onCodeChanged(value) {
    this.code=value;
  }
  event(event){
    //his.code=document
    document.getElementById("code");
    console.log('event',event);
    document.onclick=e=>{
      console.log(e.target);
      console.log(event.target.innerText);
     // event.target.outerHTML=+'<a>{{name}}</a>';
      event.target.innerHTML='<a>{{name}}</a>';
         document.getElementById('view').style.cursor='copy';
     // console.log('1',document.getElementById('view').innerHTML)
      //console.log('2',document.getElementById('view').outerHTML)
      //console.log('3',document.getElementById('view'))

      

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
