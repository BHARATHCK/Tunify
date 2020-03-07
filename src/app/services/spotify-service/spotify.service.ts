import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as qs from 'qs';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CacheRegistrationService } from '../cacheservice/cache-registration.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient, private route: Router, private cacheRegistrationService: CacheRegistrationService) { }

  Login(showDialog = true /* FOR NOW */){
    const state = uuid(); 
    localStorage.setItem('xsrf-token', state)
    const params = {
      response_type: 'token',
      client_id: `${environment.clientId}`,
      redirect_uri: `${environment.redirectUrl}`,
      scope: `${environment.scopes}`,
      state,
      show_dialog: `${showDialog}`
    }
    const redirectUrl = `${environment.appRedirectUrl}${qs.stringify(params)}`;
    console.log(redirectUrl);
    window.location.href = redirectUrl;
  }

  refreshLogin(){
    this.Login(false);
  }

  getToken(): String{
    return localStorage.getItem('access_token');
  }

  getRecentTracksForHome(): Observable<any> {
    const baseURL = 'https://api.spotify.com/v1/me/player/recently-played?limit=7';
    this.cacheRegistrationService.addToCache(baseURL);
    return this.http.get<any>(baseURL).pipe(shareReplay(1));
  }
}
