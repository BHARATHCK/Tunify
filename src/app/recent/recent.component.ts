import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  recentArray = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getRecentTracks();
  }

  getRecentTracks(){
    this.spotifyService.getRecentTracks().subscribe(
      res => {
        console.log(res.items);
        this.recentArray = res.items;
      }, error => {
        console.log('ERROR : ',error);
        if (error.error.error.message == 'Invalid access token' || error.error.error.message == 'The access token expired') {
          this.spotifyService.refreshLogin();
        }
      }
    )
  }

}
