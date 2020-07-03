import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private http: HttpClient) { }


getCompetence(id) {
  return this.http.get(environment.apiBaseUrl + `/competences/list/${id}`);
}

}