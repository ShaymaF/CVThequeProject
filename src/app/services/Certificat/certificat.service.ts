import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Certificat } from 'src/app/models/certificat';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {

  constructor(private http: HttpClient) { }


  getFormation() {
    return this.http.get(environment.apiBaseUrl + '/certificat/list');
  }
  addCertificat(certificat: Certificat) {
    return this.http.post(environment.apiBaseUrl + '/certificat/add',certificat);
  }
  deleteCertificat(id) {
    return this.http.get(environment.apiBaseUrl + `/certificat/delete/${id}`);
  }
  }