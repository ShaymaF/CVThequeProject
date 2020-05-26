import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Version } from 'src/app/models/version';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private http: HttpClient) {
    
   }
   addTemp(temp) {

    return this.http.post(environment.apiBaseUrl + '/temp/add',temp);
  }
  deleteTemp() {

    return this.http.delete(environment.apiBaseUrl + '/temp/deleteAll');
  }
}
