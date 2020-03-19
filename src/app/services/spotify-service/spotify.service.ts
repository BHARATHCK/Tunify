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
  playlistState: BehaviorSubject<any>;

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
  getTopTracks(timeRange, offset, limit) {
    const baseUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=${offset}`
    return this.http.get<any>(baseUrl);
  }

  userSelectionForPlaylistNav(selection) {
    console.log('EMITTING NEW VALUE : ', selection);
    this.userSelection$.next(selection);
  }

  search(inputValue) {
    const baseUrl = `https://api.spotify.com/v1/search?q=${inputValue}&type=track`
    return this.http.get<any>(baseUrl);
  }

  createRecommendedPlaylist(trackID) {
    const baseURL = `https://api.magicplaylist.co/mp/create/${trackID}?country=US&length=1`;
    const proxyURL = `https://cors-anywhere.herokuapp.com/`
    return this.http.get<any>(proxyURL + baseURL);
  }

  getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let currdate = mm + '/' + dd + '/' + yyyy;
    return currdate;
  }


  // GET USER PROFILE
  public getUserProfile(): Observable<any> {
    const baseUrl = "https://api.spotify.com/v1/me";
    return this.http.get<any>(baseUrl);
  }

  updatePlaylistState(state) {
    this.playlistState = new BehaviorSubject(state);
  }

  createPlaylist(nameOfPlaylist) {
    const baseURL = `https://api.spotify.com/v1/users/${sessionStorage.getItem('userId')}/playlists`;
    let body = {
      "name": `${nameOfPlaylist} ${this.getDate()}`,
      "public": "false",
      "collaborative": "false",
      "description": "Curated tracks by your all-time favorite artists"
    };
    return this.http.post<any>(baseURL, body);
  }

  savePlaylist(tracksToBeSaved, playlistId) {
    let uris = tracksToBeSaved;
    console.log('REQUEST SENT ');
    const baseURL = `https://api.spotify.com/v1/users/${sessionStorage.getItem('userId')}/playlists/${playlistId}/tracks`;
    console.log(baseURL);
    return this.http.post<any>(baseURL, uris);
  }

  getPlaylistImage(playListID) {
    const baseURL = `https://api.spotify.com/v1/users/${sessionStorage.getItem('userId')}/playlists/${playListID}/images`;
    return this.http.get<any>(baseURL);
  }

}
