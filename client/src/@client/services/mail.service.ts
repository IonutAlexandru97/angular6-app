import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
          //Local api --> http://localhost:3000/api
          //Cloud API --> https://server-dot-my-project-1484493585394.appspot.com/api
private _sendMailAPI = 'https://server-dot-my-project-1484493585394.appspot.com/api/send';
constructor(private http: HttpClient) { }

sendMail(email){
  return this.http.post<any>(this._sendMailAPI, email);
}

}
