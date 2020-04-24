import { Component, OnInit } from '@angular/core';
import { CompetenceService } from '../services/competence/competence.service';
import { Competence } from '../models/competence';

@Component({
  selector: 'app-list-collab',
  templateUrl: './list-collab.component.html',
  styleUrls: ['./list-collab.component.css']
})
export class ListCollabComponent implements OnInit {
  listComp: Competence[];arrayListComp=[];
  constructor(private competenceService : CompetenceService) { }

  ngOnInit() {
    this.getAllCompetence();
  }
  getAllCompetence() {
    this.competenceService.getCompetence().subscribe((data: Competence[]) => {
      this.listComp = data;
  
  for(let key in this.listComp){
   if(this.listComp.hasOwnProperty(key)){
    this.listComp[key].id=key;
    this.arrayListComp.push(this.listComp[key]);
  //console.log('tool list',this.InitCompetence.tools);
  
      
  
  }
  }
    });  
  }
}
