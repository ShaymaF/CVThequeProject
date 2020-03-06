import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {


  constructor(private http: HttpClient) { }


getCompetence() {
  return this.http.get(environment.apiBaseUrl + '/person/list');
}
}