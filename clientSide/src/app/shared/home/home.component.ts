import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about/about.service';
import { Formation } from '../models/formation';
import { FormationService } from '../services/formation/formation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  abouts:any;
  formations:any;
 
  constructor( ){} 
   
  ngOnInit() {
  }

    
}
