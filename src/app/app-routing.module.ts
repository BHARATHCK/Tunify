import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyplaylistsComponent } from './myplaylists/myplaylists.component';
import { RecentComponent } from './recent/recent.component';
import { HomeComponent } from './home/home.component';
import { ArtistsComponent } from './mobileViews/artists/artists.component';
import { TracksComponent } from './mobileViews/tracks/tracks.component';
import { RecentlyPlayedComponent } from './mobileViews/recently-played/recently-played.component'

const desktop_routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'recent' , component: RecentComponent},
  {path: 'myplaylist' , component: MyplaylistsComponent}
];

const mobile_routes: Routes = [
  {path: '' , component: ArtistsComponent},
  {path: 'home' , component: ArtistsComponent},
  {path: 'recent' , component: RecentlyPlayedComponent},
  {path: 'myplaylist' , component: MyplaylistsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
