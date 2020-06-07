import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { About } from 'src/app/models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }


getAbout() {
  return this.http.get(environment.apiBaseUrl + '/about/list');
}
addAbout(about: About) {
  return this.http.post(environment.apiBaseUrl + '/about/add',about);
}
deleteAbout(id) {
  return this.http.get(environment.apiBaseUrl + `/about/delete/${id}`);
}
download(html) {
  console.log('service ',this.http.post(environment.apiBaseUrl + '/about/pdf',html));
  return this.http.post(environment.apiBaseUrl + '/about/pdf',html);
}

}