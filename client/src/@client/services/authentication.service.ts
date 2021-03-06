import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface TokenPayload {
    username?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
}

interface TokenResponse {
    token: string;
}

export interface UserDetails {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
}

@Injectable()
export class AuthenticationService {
    private token: string;
    constructor(private http: HttpClient,
                private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('token', token);
        this.token = token;
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
        let base;
        if (method === 'post') {
          //Local api --> http://localhost:3000/api
          //Cloud API --> https://server-dot-my-project-1484493585394.appspot.com/api
            base = this.http.post(`http://localhost:3000/api/${type}`, user);
        } else {
            base = this.http.get(`http://localhost:3000/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
        }

        const request = base.pipe(
            map((data: TokenResponse) => {
                if(data.token){
                    this.saveToken(data.token);
                }
                return data;
            })
        );
        return request;
    }


    public register(user: TokenPayload): Observable<any> {
        return this.request('post', 'register', user);
    }

    public login(user: TokenPayload): Observable<any> {
        return this.request('post', 'login', user);
    }

    public profile(): Observable<any> {
        return this.request('get', 'profile');
    }

    loggedIn(){
      return !!localStorage.getItem('token');
    }

    logOut(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }

}
