import { Component, OnInit, ViewEncapsulation, IterableDiffers } from '@angular/core';
import { SpotifyService } from '../services/spotify-service/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  inputValue: string;
  filteredOptions: string[] = [];
  options = [];
  selectedValue = 'lucy';
  myMap = new Map();
  iterableDiffer;
  payload;

  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
  }

  onChange(value: string): void {
    this.search(value);
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onSelect(value: any){
    this.createPlaylist(this.myMap.get(value.nzValue));
  }

  createPlaylist(trackID){
    this.spotifyService.createRecommendedPlaylist(trackID).subscribe(
      res => {
        this.payload = res;
        this.router.navigate(['/customPlaylist'], {state: this.payload});
      },error => {
        console.log();
      }
    )
  }

  search(value) {
    this.spotifyService.search(value).subscribe(
      res => {
        let items = res.tracks.items;
        let tracks = [];
        items.forEach(element => {
          tracks.push(element.name);
          this.myMap.set(element.name, element.id);
        });
        this.filteredOptions = tracks;
      }, error => {
        console.log(error);
      }
    )
  }



}
