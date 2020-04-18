import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Divers } from 'src/app/models/divers';

@Injectable({
  providedIn: 'root'
})
export class DiversService {

  constructor(private http: HttpClient) { }


getDivers() {
  return this.http.get(environment.apiBaseUrl + '/divers/list');
  
}
addDivers(divers: Divers) {
  return this.http.post(environment.apiBaseUrl + '/divers/add',divers);
}
deleteDivers(id) {
  return this.http.get(environment.apiBaseUrl + `/divers/delete/${id}`);
}
}