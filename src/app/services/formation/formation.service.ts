import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }


  getFormation() {
    return this.http.get(environment.apiBaseUrl + '/formation/list');
  }
  }