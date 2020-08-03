import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { About } from '../../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }


getAbout(id) {
  return this.http.get(environment.apiBaseUrl + `/about/list/${id}`);
}
addAbout(about: About) {
  return this.http.post(environment.apiBaseUrl + '/about/add',about);
}
deleteAbout(id) {
  return this.http.get(environment.apiBaseUrl + `/about/delete/${id}`);
}
download(html) {
  return this.http.post(environment.apiBaseUrl + '/about/pdf',html);
   
}
getPDF(){
  return this.http.get(environment.apiBaseUrl + '/about/getPDF');
  
}

}