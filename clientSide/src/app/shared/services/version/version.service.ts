import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Version } from '../../models/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }
  addVersion(version: Version) {

    return this.http.post(environment.apiBaseUrl + '/version/add',version);
  }
  addFolder(folder: any) {

    return this.http.post(environment.apiBaseUrl + '/version/add/folder',folder);
  }
  getVersion() {

    return this.http.get(environment.apiBaseUrl + '/version/list');
  }
  getFolders(){
    return this.http.get(environment.apiBaseUrl + '/version/list/folder');
  }
  getOneVersion(id,IDF) {

    return this.http.get(environment.apiBaseUrl +  `/version/version/${id}/${IDF}`);
  }
  openFolder(id) {

    return this.http.get(environment.apiBaseUrl +  `/version/folder/${id}`);
  }
  deleteVersion(id) {
    return this.http.get(environment.apiBaseUrl + `/version/delete/${id}`);
  }
  deleteFolder(id) {
    return this.http.get(environment.apiBaseUrl + `/version/delete/folder/${id}`);
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