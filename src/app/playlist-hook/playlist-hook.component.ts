import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { ApplicationStateService } from '../services/application-state/application-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-playlist-hook',
  templateUrl: './playlist-hook.component.html',
  styleUrls: ['./playlist-hook.component.css']
})
export class PlaylistHookComponent implements OnInit {

  tracks;
  playlistName;

  validateForm: FormGroup;
  isformdirty: boolean = false;

  constructor(private router: Router, private spotifyService: SpotifyService, private appStateService: ApplicationStateService, private fb: FormBuilder) { 
    let data = this.router.getCurrentNavigation().extras.state;
    if(data){
      this.tracks = data.data.playlist;
      this.spotifyService.updatePlaylistState(this.tracks);
    } else {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
        // Clear the fields
        this.validateForm = this.fb.group({
          playlistName: [null, [Validators.required]],
        });
  }

  playlistNameChange(){
    this.appStateService.playlistName = this.playlistName;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  createPlaylist() {

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {

    }
  }

}
