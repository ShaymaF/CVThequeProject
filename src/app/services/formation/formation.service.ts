import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Formation } from 'src/app/models/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }


  getFormation() {
    return this.http.get(environment.apiBaseUrl + '/formation/list');
  }
  addFormation(formation: Formation) {
    return this.http.post(environment.apiBaseUrl + '/formation/add',formation);
  }
  deleteFormation(id) {
    return this.http.get(environment.apiBaseUrl + `/formation/delete/${id}`);
  }
  }