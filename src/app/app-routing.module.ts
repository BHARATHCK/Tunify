import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router, ActivatedRoute, Params } from '@angular/router';
import { MyplaylistsComponent } from './myplaylists/myplaylists.component';
import { RecentComponent } from './recent/recent.component';
import { HomeComponent } from './home/home.component';
import { ArtistsComponent } from './mobileViews/artists/artists.component';
import { TracksComponent } from './mobileViews/tracks/tracks.component';
import { RecentlyPlayedComponent } from './mobileViews/recently-played/recently-played.component';
import { ApplicationStateService } from './services/application-state/application-state.service';
import { Location } from '@angular/common';
import { SpotifyService } from './services/spotify-service/spotify.service';
import { PlaylistHookComponent } from './playlist-hook/playlist-hook.component';

const desktop_routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recent', component: RecentComponent },
  { path: 'myplaylist', component: MyplaylistsComponent },
  { path: 'customPlaylist', component: PlaylistHookComponent}
];

const mobile_routes: Routes = [
  { path: '', component: ArtistsComponent },
  { path: 'home', component: ArtistsComponent },
  { path: 'recent', component: RecentlyPlayedComponent },
  { path: 'myplaylist', component: MyplaylistsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router, private applicationStateService: ApplicationStateService, private location: Location, private spotifyService: SpotifyService, private activatedRoute: ActivatedRoute) {
    this.routeBasedOnResChange();
  }



  routeBasedOnResChange() {
    this.applicationStateService.resChange.subscribe(
      res => {
        if (res) {
          this.acquireToken();
          this.router.resetConfig(mobile_routes);
          this.router.navigate([this.router.url]);
        } else {
          this.acquireToken();
          this.router.resetConfig(desktop_routes);
          this.router.navigate([this.location.path()]);
        }
      }
    )
  }


  acquireToken() {

    let urlString = window.location.href;
    if (urlString) {
      let urlCollect = urlString.split('#');
      if (urlCollect.length > 1) {
        urlCollect = urlCollect[1].split('&');
        urlString = urlCollect[0];
        let token = urlString.replace('access_token=', '');
        localStorage.setItem('access_token', token);
      }
    }
  }



}
