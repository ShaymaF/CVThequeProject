import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoisirService {

 
  constructor(private http: HttpClient) { }


getLoisirs(id) {
  return this.http.get(environment.apiBaseUrl + `/loisirs/list/${id}`);
}

}