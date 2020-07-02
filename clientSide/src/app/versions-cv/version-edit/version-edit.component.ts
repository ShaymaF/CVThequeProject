import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit ,EventEmitter, Input,ElementRef,ViewChild } from '@angular/core';


//const URL = 'http://localhost:8080/upload';
const uploadAPI = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-version-edit',
  templateUrl: './version-edit.component.html',
  styleUrls: ['./version-edit.component.css']
})
export class VersionEditComponent implements OnInit {
  
 
  public ngOnInit( ) {
    }
    
constructor()
 {}


   
}