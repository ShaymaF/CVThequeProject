import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Version } from 'src/app/models/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }
  addVersion(version: Version) {

    return this.http.post(environment.apiBaseUrl + '/version/add',version);
  }
  getVersion() {

    return this.http.get(environment.apiBaseUrl + '/version/list');
  }
}
