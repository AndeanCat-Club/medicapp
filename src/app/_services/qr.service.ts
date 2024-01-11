import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private baseUrl: string = environment.qrApi || 'http://localhost:8080';
  private ownDomain: string = `${window.location.href}/medical-record` || 'http://localhost:8100/medical-record';

  constructor(private http: HttpClient) {}

  generateQRCode(data: String | undefined): Observable<any> {
    const url = `${this.baseUrl}/post-generate-qr?data=${this.ownDomain}?code=${data}`;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json'
    };

    return this.http.post(url, null, options);
  }
}