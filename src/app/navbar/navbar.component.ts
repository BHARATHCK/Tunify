import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { Router, RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { ApplicationStateService } from '../services/application-state/application-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showPlaylistNavigator: boolean = false;
  username;
  switchValue: boolean = true;

  constructor(private spotifyService: SpotifyService, private router: Router, private appStateService: ApplicationStateService) { }

  ngOnInit(): void {
    this.subscribeToRouter();
    this.getUserProfile();
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

  getUserProfile(){
    this.spotifyService.getUserProfile().subscribe(
      res=> {
        this.username = res.display_name;
        sessionStorage.setItem('userId',res.id);
      }, error => {
        console.log('ERROR : ',error);
      }
    )
  }

  viewTypeChange(){
    this.appStateService.viewType.next(this.switchValue);
  }

}
