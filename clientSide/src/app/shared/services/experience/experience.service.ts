import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { toArray } from 'rxjs/operators';
import { Experience, Projet } from '../../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  experience: Experience; projet: Projet;
  constructor(private http: HttpClient) { }

/*
getExperience() {
  return this.http.get(environment.apiBaseUrl + '/experience/list');
}
/**
 * getExperience() {
  return this.http.get(environment.apiBaseUrl + '/experience/list')
  .subscribe( res => {
    console.log(res.json());
    this.experiences = res.json().experiences; // Before this.productos = res.json(); 
  });
}
 */
getExperience(id): Observable<Experience[]> {
  return this.http.get<Experience[]>(environment.apiBaseUrl + `/experience/list/${id}`).pipe(
    // convert object to array
   // toArray<Experience>()
  
  );
}


getProjet(): Observable<Projet[]> {
  return this.http.get<Projet[]>(environment.apiBaseUrl + '/projet/list').pipe(
    // convert object to array
   // toArray<Experience>()
  
  );
}

getOrganisation(){
  return this.http.get(environment.apiBaseUrl + '/projet/listOrga');

}

}