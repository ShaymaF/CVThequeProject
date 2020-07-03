import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import * as jwt_decode from 'jwt-decode';
import { Competence } from '../shared/models/competence';
import { Person } from '../shared/models/person';
import { Template } from '../shared/models/template';
import { PersonService } from '../shared/services/person/person.service';
import { AuthService } from '../shared/services/_auth/auth.service';
import { TokenStorageService } from '../shared/services/token-storage/token-storage.service';
import { TempService } from '../shared/services/temp/temp.service';

@Component({
  selector: 'app-list-collab',
  templateUrl: './list-collab.component.html',
  styleUrls: ['./list-collab.component.css']
})
export class ListCollabComponent implements OnInit {
  listComp: Competence[];arrayListPerson=[];listPerson: Person[];
  searchText;searchText1;
role;departement;
localUrl;selectedImage;imageUrl;
template:Template;
  constructor(private personService : PersonService,private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router,private storage: AngularFireStorage,private tempService:TempService) {

 
   }

  ngOnInit() {
    //get role from decoded token
    var decoded = jwt_decode(this.tokenStorage.getToken());
    this.role=decoded.claims.role;
    this.departement=decoded.claims.departement;
  console.log('role',this.role);
  console.log('token',decoded);
  //show collab list with user role
   if(decoded.claims.role=="RH"|| decoded.claims.role=="COMMERCIAL"){
     this.getAllList() ;

   }

   else if(decoded.claims.role=="MANAGER"){
    this.getListForManger() ;
   }
  
  else if(decoded.claims.role=="GUEST"){
   //  this.router.navigateByUrl('/collab-list');
 document.getElementById("bloc").style.display="none";

   }  
   else {
    document.getElementById("bloc").style.display="none";

   }
  }
  getAllList() {
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
  getListForManger() {
    this.personService.getListForManger(this.departement).subscribe((data: Person[]) => {
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
   // localStorage.setItem("template",);

  }
  temp2(){localStorage.setItem("template","temp2");}
  temp1(){localStorage.setItem("template","temp1");}
  temp3(){localStorage.setItem("template","");}


}
