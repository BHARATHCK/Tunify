import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { ApplicationStateService } from '../services/application-state/application-state.service';

@Component({
  selector: 'app-myplaylists',
  templateUrl: './myplaylists.component.html',
  styleUrls: ['./myplaylists.component.css']
})
export class MyplaylistsComponent implements OnInit {

  topArtistsArray = [];
  topTracksArray = [];
  switchValue: boolean = true;

  constructor(private spotifyService: SpotifyService, private appStateService: ApplicationStateService) { }

  ngOnInit(): void {
    this.userSelection();
    this.viewTypeChange();
  }

  getTopArtists(term){
    this.spotifyService.getTopArtists(term,0,100).subscribe(
      res => {
        this.topArtistsArray = res.items;
        this.topTracksArray = [];
        this.spotifyService.updatePlaylistState(res.items);
      },
      error => {
        if (error.error.error.message == 'Invalid access token' || error.error.error.message == 'The access token expired') {
          this.spotifyService.refreshLogin();
        }
      }
    )
  }

  getTopTracks(term){
    this.spotifyService.getTopTracks(term,0,100).subscribe(
      res => {
        this.topTracksArray = res.items;
        this.topArtistsArray = [];
        this.spotifyService.updatePlaylistState(res.items);
      }
    )
  }

  userSelection(){
    console.log('USER SELCTION CALLED ');
    this.spotifyService.userSelection$.subscribe(
      res => {
        if(res == 'track'){
          this.getTopTracks('long_term');
        }
        if(res == 'artist'){
          this.getTopArtists('long_term');
        }
      }
    )
  }

  passParameters(event){
    console.log(event);
    if(event.index == 1){
      this.spotifyService.userSelection$.subscribe(
        res => {
          if(res == 'track'){
            this.getTopTracks('medium_term');
          }
          if(res == 'artist'){
            this.getTopArtists('medium_term');
          }
        }
      )
    } else if(event.index == 2){
      this.spotifyService.userSelection$.subscribe(
        res => {
          if(res == 'track'){
            this.getTopTracks('short_term');
          }
          if(res == 'artist'){
            this.getTopArtists('short_term');
          }
        }
      )
    } else if(event.index == 0){
      this.spotifyService.userSelection$.subscribe(
        res => {
          if(res == 'track'){
            this.getTopTracks('long_term');
          }
          if(res == 'artist'){
            this.getTopArtists('long_term');
          }
        }
      )
    }
  }

  viewTypeChange(){
    this.appStateService.viewType.subscribe(
      res => {
        this.switchValue = res;
      }, error => {
        console.log(error);
      }
    )
  }
}
