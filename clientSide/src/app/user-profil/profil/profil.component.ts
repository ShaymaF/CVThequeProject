import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person/person.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage/token-storage.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @Input () listPerson:Person;
  currentUser;
  constructor(private personService :PersonService,private tokenStorage: TokenStorageService) { }

  ngOnInit() {

    var decoded = jwt_decode(this.tokenStorage.getToken());
    this.currentUser=decoded.uid;
    this.getPerson();
   // document.getElementById('account').hidden=true;
    document.getElementById('password').hidden=true;
  }
  getPerson()  {
    this.personService.getOnePerson(this.currentUser).subscribe((data: Person) => {
      this.listPerson = data;

    });  
  }

  changeStyle(id){
    document.getElementById('info').hidden=true;
   // document.getElementById('account').hidden=true;
    document.getElementById('password').hidden=true;
    document.getElementById(id).hidden=false;
  }

}
