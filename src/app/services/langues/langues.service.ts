import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Langue } from 'src/app/models/langues';

@Injectable({
  providedIn: 'root'
})
export class LanguesService {

  constructor(private http: HttpClient) { }
  addLangue(langue: Langue) {
    return this.http.post(environment.apiBaseUrl + '/langues/add',langue);
  }
  deleteLangues(id) {
    console.log('id from service',id)
    return this.http.get(environment.apiBaseUrl + `/langues/delete/${id}`);
  }
  getLangues() {
    return this.http.get(environment.apiBaseUrl + '/langues/list');
  }

}


