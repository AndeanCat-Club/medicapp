import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private baseUrl: string = environment.host || 'http://localhost:3000';
  private ownDomain: string = `${window.location.origin}/medical-record` || 'http://localhost:8100/medical-record';
  
  constructor(private http: HttpClient) { }

  generateQRCode(data: String | undefined): Observable<any> {
    const finalData = `${this.ownDomain}?code=${data}`

    const body = { data: finalData };
    const url = `${this.baseUrl}/person/generateQRCode/`;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json'
    };

    return this.http.post(url, body, options);
  }
}