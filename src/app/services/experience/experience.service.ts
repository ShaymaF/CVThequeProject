import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  
  constructor(private http: HttpClient) { }


getExperience() {
  return this.http.get(environment.apiBaseUrl + '/experience/list');
}
}