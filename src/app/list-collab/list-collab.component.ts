import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person/person.service';
import { Person } from '../models/person';
import { Competence } from '../models/competence';

@Component({
  selector: 'app-list-collab',
  templateUrl: './list-collab.component.html',
  styleUrls: ['./list-collab.component.css']
})
export class ListCollabComponent implements OnInit {
  listComp: Competence[];arrayListPerson=[];listPerson: Person[];
  constructor(private personService : PersonService) { }

  ngOnInit() {
    this.getAllPerson();
  }
  getAllPerson() {
    this.personService.getPerson().subscribe((data: Person[]) => {
      this.listPerson = data;
  
  for(let key in this.listPerson){
   if(this.listPerson.hasOwnProperty(key)){
    //this.listComp[key].id=key;
    this.arrayListPerson.push(this.listPerson[key]);
  //console.log('tool list',this.InitCompetence.tools);
  
      
  
  }
  }
    });  
  }
  sendId(id){
    localStorage.setItem("collabId",id);
  }
}
