import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {

  constructor(private http: HttpClient) { }


  getCertificat(id) {
    return this.http.get(environment.apiBaseUrl + `/certificat/list/${id}`);
  }
  
  }