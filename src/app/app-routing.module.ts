import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, Router } from '@angular/router';
import { MyplaylistsComponent } from './myplaylists/myplaylists.component';
import { RecentComponent } from './recent/recent.component';
import { HomeComponent } from './home/home.component';
import { ArtistsComponent } from './mobileViews/artists/artists.component';
import { TracksComponent } from './mobileViews/tracks/tracks.component';
import { RecentlyPlayedComponent } from './mobileViews/recently-played/recently-played.component';
import { ApplicationStateService } from './services/application-state/application-state.service';

const desktop_routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'recent' , component: RecentComponent},
  {path: 'myplaylist' , component: MyplaylistsComponent},
  {path: '**', redirectTo: ''}
];

const mobile_routes: Routes = [
  {path: '' , component: ArtistsComponent},
  {path: 'home' , component: ArtistsComponent},
  {path: 'recent' , component: RecentlyPlayedComponent},
  {path: 'myplaylist' , component: MyplaylistsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes , {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router , private applicationStateService: ApplicationStateService){
    this.routeBasedOnResChange();
  }



  routeBasedOnResChange(){
    this.applicationStateService.resChange.subscribe(
      res => {
        if(res){
          this.router.resetConfig(mobile_routes);
          
          this.router.navigate([this.router.url]);
          console.log('mobile');
        } else {
          this.router.resetConfig(desktop_routes);

          this.router.navigate([this.router.url]);
          console.log('desktop');
        }
      }
    )
  }



}
