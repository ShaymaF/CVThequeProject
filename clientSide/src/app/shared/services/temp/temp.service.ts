import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Template } from '../../models/template';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private http: HttpClient) {
    
   }
   addTemp(temp:Template) {

    return this.http.post(environment.apiBaseUrl + '/temp/add',temp);
  }
  deleteTemp() {

    return this.http.delete(environment.apiBaseUrl + '/temp/deleteAll');
  }
  getAll() {
    return this.http.get(environment.apiBaseUrl + '/temp/list');
  }

  getOne(id) {
    return this.http.get(environment.apiBaseUrl + `/temp/getOne/${id}`);
  }
}
