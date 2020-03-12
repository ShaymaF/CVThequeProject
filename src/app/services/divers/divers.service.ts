import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiversService {

  constructor(private http: HttpClient) { }


getDivers() {
  return this.http.get(environment.apiBaseUrl + '/divers/list');
  
}
}