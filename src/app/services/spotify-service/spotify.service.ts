import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as qs from 'qs';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient, private route: Router) { }

  Login(showDialog = false /* FOR NOW */){
    const state = uuid(); 
    localStorage.setItem('xsrf-token', state)
    const params = {
      response_type: 'token',
      client_id: `${environment.clientId}`,
      redirect_uri: `${environment.redirectUrl}`,
      scope: `${environment.scopes}`,
        // tslint:disable-next-line: max-line-length,
      state,
      show_dialog: `${showDialog}`
    }
    const redirectUrl = `${environment.appRedirectUrl}+${qs.stringify(params)}`;
    window.location.href = redirectUrl;
  } 
}
