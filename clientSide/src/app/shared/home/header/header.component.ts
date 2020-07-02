import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person/person.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { AuthService } from '../../services/_auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input () listPerson:Person;
currentUser;
  constructor(private personService :PersonService,private tokenStorage: TokenStorageService,
    private authService:AuthService,private router: Router) { }

  ngOnInit() {
    var decoded = jwt_decode(this.tokenStorage.getToken());
    this.currentUser=decoded.uid;
    this.getPerson();
  }
  getPerson()  {
    this.personService.getOnePerson(this.currentUser).subscribe((data: Person) => {
      this.listPerson = data;
    //  this.arrayListPerson = data;
  console.log('personn',this.listPerson);
  //console.log(this.profil=this.listPerson[8]);

    });  
  }
  logout(){
  
    this.authService.signOut();
    this.router.navigateByUrl('login');

  }
}
