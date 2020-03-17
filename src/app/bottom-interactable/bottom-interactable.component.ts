import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-bottom-interactable',
  templateUrl: './bottom-interactable.component.html',
  styleUrls: ['./bottom-interactable.component.css']
})
export class BottomInteractableComponent implements OnInit {

  constructor(private router: Router, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if(this.router.url == '/customPlaylist' || this.router.url == '/recent' || this.router.url == '/myplaylist'){
      if (window.pageYOffset > 30) {
        let element = document.getElementsByClassName('bottomPane')[0];
        element.classList.add('bottomNav');
      } else {
         let element = document.getElementsByClassName('bottomPane')[0];
         element.classList.remove('bottomNav');
      }
    }
  }

  createPlaylist(){
    this.spotifyService.playlistState.subscribe(
      res => {
        console.log("APP STATE : ", res);
      }
    )
  }

}