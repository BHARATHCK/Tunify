import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as qs from 'qs';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CacheRegistrationService } from '../cacheservice/cache-registration.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  userSelection$: BehaviorSubject<any> = new BehaviorSubject('artist');

  constructor(private http: HttpClient, private route: Router, private cacheRegistrationService: CacheRegistrationService) { }

  Login(showDialog = true /* FOR NOW */) {
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

  refreshLogin() {
    this.Login(false);
  }

  getToken(): String {
    return localStorage.getItem('access_token');
  }

  getRecentTracksForHome(): Observable<any> {
    const baseURL = 'https://api.spotify.com/v1/me/player/recently-played?limit=7';
    //this.cacheRegistrationService.addToCache(baseURL);
    return this.http.get<any>(baseURL);
  }

  getRecentTracks(): Observable<any> {
    const baseURL = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
    return this.http.get<any>(baseURL);
  }

  // GET THE TOP ARTISTS OF THE USER
  getTopArtists(timeRange, offset, limit): Observable<any> {
    const baseUrl = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
    return this.http.get<any>(baseUrl);
  }

  // GET THE TOP TRACKS PLAYED BY USER
  getTopTracks(timeRange, offset, limit){
    const baseUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`
    return this.http.get<any>(baseUrl);
  }

  userSelectionForPlaylistNav(selection){
    console.log('EMITTING NEW VALUE : ', selection);
    this.userSelection$.next(selection);
  }

}
