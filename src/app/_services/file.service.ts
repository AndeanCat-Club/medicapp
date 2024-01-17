import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable()

export class FileService {
  private url: string = environment.fileServer;
  public fileUploaded: any;

  constructor(private http: HttpClient) { }

  sendFile(formData: FormData) {
    formData.append('privacy', 'private');
    formData.append('storageClient', environment.storageClient)
    return this.http.post<any>(`${this.url}/file/createFile`, formData, {});
  }

  readFile(filePath: String) {
    const body = {
      storageClient: environment.storageClient,
      storageData: {
        "filePath": filePath
      }
    }

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json'
    };

    return this.http.post<any>(`${this.url}/file/getFile`, body, options);
  }

  createFile(formData: FormData) {
    formData.append('privacy', 'private');
    formData.append('storageClient', environment.storageClient)
    return this.http.post<any>(`${this.url}/file/createFile`, formData, {});
  }

  urlToBlob(imageUrl: string): Observable<string> {
    return this.http.get(imageUrl, { responseType: 'arraybuffer' }).pipe(
      map((data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
      })
    );
  }
}