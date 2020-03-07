import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../services/application-state/application-state.service';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentArray = [];

  constructor(private applicationStateService: ApplicationStateService, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getRecentlyPlayedTracks();
    this.handleWindowResize();
  }

  handleWindowResize() {
    this.applicationStateService.resChangeNotifier.subscribe(
      res => {
        if (res) {
          if(res >= 1428){
            this.recentArray.length = 7;
          }
          if (res < 1428) {
            this.recentArray.length = 6;
          }
          if (res < 1238) {
            this.recentArray.length = 5;
          }
          if (res < 1048) {
            this.recentArray.length = 4;
          }
          if (res < 858) {
            this.recentArray.length = 3;
          }
        }
      }
    )
  }


  getRecentlyPlayedTracks() {
    this.spotifyService.getRecentTracksForHome().subscribe(
      res => {
        this.recentArray = res.items;
      },
      error => {
      }
    )
  }

}
