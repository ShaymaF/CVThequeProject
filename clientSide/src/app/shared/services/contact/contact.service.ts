import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


getContacts(id) {
  return this.http.get(environment.apiBaseUrl + `/contact/list/${id}`);
}

}