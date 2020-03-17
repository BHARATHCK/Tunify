import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-playlist-hook',
  templateUrl: './playlist-hook.component.html',
  styleUrls: ['./playlist-hook.component.css']
})
export class PlaylistHookComponent implements OnInit {

  tracks;

  constructor(private router: Router, private spotifyService: SpotifyService) { 
    let data = this.router.getCurrentNavigation().extras.state;
    if(data){
      this.tracks = data.data.playlist;
      this.spotifyService.updatePlaylistState(this.tracks);
    } else {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
  }

}
