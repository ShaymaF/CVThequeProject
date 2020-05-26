import { Component, OnInit } from '@angular/core';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { AboutService } from '../services/about/about.service';
import { saveAs } from 'file-saver';

import * as jsPDF from 'jspdf';
 var xepOnline: any;
@Component({
  selector: 'app-edition-cv2',
  templateUrl: './edition-cv2.component.html',
  styleUrls: ['./edition-cv2.component.css']
})
export class EditionCv2Component implements OnInit {
  public Editor= InlineEditor;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
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
  this.aboutService.download().subscribe(data => {
console.log(data)
//FileSaver.saveAs(data);
  }
  );
}

}