import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-myplaylists',
  templateUrl: './myplaylists.component.html',
  styleUrls: ['./myplaylists.component.css']
})
export class MyplaylistsComponent implements OnInit {

  topArtistsArray = [];
  topTracksArray = [];
  switchValue: boolean = true;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.userSelection();
  }

  getTopArtists(){
    this.spotifyService.getTopArtists('long_term',0,100).subscribe(
      res => {
        this.topArtistsArray = res.items;
        console.log(this.topArtistsArray);
        this.topTracksArray = [];
      },
      error => {
        if (error.error.error.message == 'Invalid access token' || error.error.error.message == 'The access token expired') {
          this.spotifyService.refreshLogin();
        }
      }
    )
  }

  getTopTracks(){
    this.spotifyService.getTopTracks('long_term',0,100).subscribe(
      res => {
        this.topTracksArray = res.items;
        this.topArtistsArray = [];
      }
    )
  }

  userSelection(){
    this.spotifyService.userSelection$.subscribe(
      res => {
        if(res == 'track'){
          this.getTopTracks();
        }
        if(res == 'artist'){
          this.getTopArtists();
        }
      }
    )
  }

  switchFunction(){
    if(this.switchValue){
      // RANKED VIEW

    }
    if(!this.switchValue){
      // NORMAL VIEW
    }
  }
}
