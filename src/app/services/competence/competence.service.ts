import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Competence } from 'src/app/models/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }


getCompetence() {
  return this.http.get(environment.apiBaseUrl + '/competences/list');
}
addCompetence(competence: Competence) {
  return this.http.post(environment.apiBaseUrl + '/competences/add',competence);
}
deleteCompetence(id) {
  return this.http.get(environment.apiBaseUrl + `/competences/delete/${id}`);
}
}