import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }


  login(){
    console.log('LOGIN');
    this.spotifyService.Login();
  }

}
