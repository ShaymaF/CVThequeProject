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
  constructor(private aboutService :AboutService, private formationService :FormationService ){
    this.getAllAbouts();
    this.getAllFormations();
    }
  ngOnInit() {
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
}
