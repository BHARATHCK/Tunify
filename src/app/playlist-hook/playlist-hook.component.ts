import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-hook',
  templateUrl: './playlist-hook.component.html',
  styleUrls: ['./playlist-hook.component.css']
})
export class PlaylistHookComponent implements OnInit {

  tracks;

  constructor(private router: Router) { 
    let data = this.router.getCurrentNavigation().extras.state;
    if(data){
      this.tracks = data.data.playlist;;
    } else {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    console.log("PLAYLIST OBJECT :: " , history.state.res);
  }

}
