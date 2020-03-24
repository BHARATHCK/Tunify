import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { ApplicationStateService } from '../services/application-state/application-state.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  playlistName;
  imageSRC;
  displayText: string ='';
  feedbackStatus;

  constructor(private route: Router, private service: SpotifyService, private appState: ApplicationStateService) { }

  ngOnInit() {
    if(!this.appState.mostRecentPlaylistImage){
      this.route.navigate(['']);
    } else if(this.appState.mostRecentPlaylistImage == 'error'){
      this.feedbackStatus = `error`;
      this.displayText = 'SORRY THERE WAS SOME ISSUE WITH SAVING THE PLAYLIST, please try again later';
    } else {
      this.feedbackStatus = `success`;
      this.displayText = 'PLAYLIST HAS BEEN CREATED SUCCESSFULLY';
      this.imageSRC = this.appState.mostRecentPlaylistImage;
    }
  }

  close() {
    this.route.navigate(['']);
  }

}
