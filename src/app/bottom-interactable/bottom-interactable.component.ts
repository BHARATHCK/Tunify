import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { ApplicationStateService } from '../services/application-state/application-state.service';

@Component({
  selector: 'app-bottom-interactable',
  templateUrl: './bottom-interactable.component.html',
  styleUrls: ['./bottom-interactable.component.css']
})
export class BottomInteractableComponent implements OnInit {

  constructor(private router: Router, private spotifyService: SpotifyService, private appState: ApplicationStateService) { }

  ngOnInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (this.router.url == '/customPlaylist' || this.router.url == '/recent' || this.router.url == '/myplaylist') {
      if (window.pageYOffset > 30) {
        let element = document.getElementsByClassName('bottomPane')[0];
        element.classList.add('bottomNav');
      } else {
        let element = document.getElementsByClassName('bottomPane')[0];
        element.classList.remove('bottomNav');
      }
    }
  }

  savePlaylist(playlistId) {
    this.appState.mostRecentPlaylistID = playlistId;
    let trackItems = [];
    this.spotifyService.playlistState.subscribe(
      res => {
        for (let resItem of res) {
          trackItems.push(resItem.uri);
        }
        this.spotifyService.savePlaylist(trackItems, playlistId).subscribe(
          res => {
            console.log('PLAYLIST SAVED', res);
            this.showPlaylistCreationFeedback();
          }, error => {
            this.showPlaylistCreationFeedback();
          }
        )
      }
    )
  }

  showPlaylistCreationFeedback() {
    this.spotifyService.getPlaylistImage(this.appState.mostRecentPlaylistID).subscribe(
      res => {
        if (res.length >= 1) {
          this.appState.mostRecentPlaylistImage = res[0].url;
          this.router.navigate(['feedback']);
        } else {
          this.appState.mostRecentPlaylistImage = 'error';
        this.router.navigate(['feedback']);
        }

      }, error => {
        console.log('error :: ', error);
      }
    )
  }

  createPlaylist() {
    this.spotifyService.playlistState.subscribe(
      res => {
        this.spotifyService.createPlaylist('NEW TEST').subscribe(
          res => {
            this.savePlaylist(res.id);
          },
          error => {
            console.log('SOME ERROR OCCURED :: ', error);
          }
        )
      }
    )
  }

}
