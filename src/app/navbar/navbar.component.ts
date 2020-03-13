import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { Router, RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showPlaylistNavigator: boolean = false;

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToRouter();
  }

  subscribeToRouter(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        if(event.urlAfterRedirects == '/myplaylist'){
          this.showPlaylistNavigator = true;
        } else {
          this.showPlaylistNavigator = false;
        }
      }
    })
  }

  login(){
    this.spotifyService.Login();
  }

  userSelection(selection){
    console.log('CLICKED : ', selection);
    this.spotifyService.userSelectionForPlaylistNav(selection);
  }

}
