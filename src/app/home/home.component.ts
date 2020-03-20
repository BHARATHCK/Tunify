import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../services/application-state/application-state.service';
import { SpotifyService } from '../services/spotify-service/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentArray = [];
  recentMap;

  constructor(private applicationStateService: ApplicationStateService, private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getRecentlyPlayedTracks();
  }

  handleWindowResize() {
    this.applicationStateService.resChangeNotifier.subscribe(
      res => {
        if (res) {
          if (res >= 1428) {
            this.recentArray.length = 7;
          }
          if (res < 1428) {
            this.recentArray.length = 6;
          }
          if (res < 1238) {
            this.recentArray.length = 5;
          }
          if (res < 1048) {
            this.recentArray.length = 4;
          }
          if (res < 858) {
            this.recentArray.length = 3;
          }
        }
      }
    )
  }


  getRecentlyPlayedTracks() {
    this.spotifyService.getRecentTracksForHome().subscribe(
      res => {
        this.recentArray = res.items;
        let unique = this.removeDuplicates(this.recentArray, 'id')
        console.log("UNIQUE ARRAY : ", unique);
        let duplicates = unique.map(value => [value, this.recentArray.filter(val => val.track.id === value.track.id).length]);
        this.recentArray = [... new Set(duplicates)];
        console.log("RECENT ARRAY :: ", this.recentArray);
        this.handleWindowResize();
      },
      error => {
        console.log('error : ', error);
        if (error.error.error.message == 'Invalid access token' || error.error.error.message == 'The access token expired') {
          this.spotifyService.refreshLogin();
        }
      }
    )
  }


  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = [];

    for (let item of originalArray) {
      lookupObject.push(item.track.id);
    }
    console.log("LOOKUP OBJECT BEFORE :: ", lookupObject);
    lookupObject = lookupObject.filter((a, i, aa) => aa.indexOf(a) === i && aa.lastIndexOf(a) !== i);
    console.log("LOOKUP OBJECT AFTER :: ", lookupObject);

    originalArray.forEach(element => {
      let flag = 0;
      for (let value of lookupObject) {
        if (element.track.id == value) {

        }
      }
      if (flag == 0) {
        newArray.push(element);
      }
    });

    return newArray;
  }

}
