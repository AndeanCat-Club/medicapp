import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()

export class FileService {
  private url: string = environment.fileServer;
  public fileUploaded: any;

  constructor(private http: HttpClient) { }
 
  sendFile(formData: FormData){
    formData.append('privacy', 'private');   
    formData.append('storageClient', environment.storageClient)
    return this.http.post<any>(`${this.url}/file/createFile`, formData, {});
  }

  readFile(filePath: String){
    const body = {
      storageClient: environment.storageClient,
      storageData:{
          "filePath":filePath
      }
    }
    
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'json'
    };

    return this.http.post<any>(`${this.url}/file/getFile`, body, options);
  }

  createFile(formData: FormData){
    formData.append('privacy', 'private');
    formData.append('storageClient', environment.storageClient)
    return this.http.post<any>(`${this.url}/file/createFile`, formData, {});
  }

  
}