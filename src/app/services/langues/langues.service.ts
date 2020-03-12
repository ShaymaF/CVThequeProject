import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguesService {

  constructor(private http: HttpClient) { }
  getLangues() {
    return this.http.get(environment.apiBaseUrl + '/langues/list');
  }
}
