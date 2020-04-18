import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Loisirs } from 'src/app/models/loisirs';

@Injectable({
  providedIn: 'root'
})
export class LoisirService {

 
  constructor(private http: HttpClient) { }


getLoisirs() {
  return this.http.get(environment.apiBaseUrl + '/loisirs/list');
}
addLoisirs(loisirs: Loisirs) {
  return this.http.post(environment.apiBaseUrl + '/loisirs/add',loisirs);
}
deleteLoisirs(id) {
  return this.http.get(environment.apiBaseUrl + `/loisirs/delete/${id}`);
}
}