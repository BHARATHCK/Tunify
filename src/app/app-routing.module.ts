import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyplaylistsComponent } from './myplaylists/myplaylists.component';
import { RecentComponent } from './recent/recent.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'recent' , component: RecentComponent},
  {path: 'myplaylist' , component: MyplaylistsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
