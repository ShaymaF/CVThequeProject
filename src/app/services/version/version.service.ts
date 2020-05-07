import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Version } from 'src/app/models/version';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }
  addVersion(version: any) {

    return this.http.post(environment.apiBaseUrl + '/version/add',version);
  }
  getVersion() {

    return this.http.get(environment.apiBaseUrl + '/version/list');
  }
  getOneVersion(id) {

    return this.http.get(environment.apiBaseUrl +  `/version/version/${id}`);
  }
  deleteVersion(id) {
    return this.http.get(environment.apiBaseUrl + `/version/delete/${id}`);
  }
  
  uploadImage(file: File,filename): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST',environment.apiBaseUrl + `/version/upload/${filename}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
console.log('req',req);
    return this.http.request(req);
  }
}