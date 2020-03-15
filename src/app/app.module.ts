import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {environment} from '../environments/environment';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MyplaylistsComponent } from './myplaylists/myplaylists.component';
import { RecentComponent } from './recent/recent.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';


import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule} from '@angular/common/http';
import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { MobileHomeComponent } from './mobileViews/mobile-home/mobile-home.component';
import { ArtistsComponent } from './mobileViews/artists/artists.component';
import { TracksComponent } from './mobileViews/tracks/tracks.component';
import { RecentlyPlayedComponent } from './mobileViews/recently-played/recently-played.component';
import { ServiceInterceptor } from './services/interceptors/service-interceptor';
import { CacheRegistrationService } from './services/cacheservice/cache-registration.service';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { PlaylistHookComponent } from './playlist-hook/playlist-hook.component';
import { BottomInteractableComponent } from './bottom-interactable/bottom-interactable.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    MyplaylistsComponent,
    RecentComponent,
    HomeComponent,
    SearchBarComponent,
    MobileHomeComponent,
    ArtistsComponent,
    TracksComponent,
    RecentlyPlayedComponent,
    PlaylistHookComponent,
    BottomInteractableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    TextFieldModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    NzAutocompleteModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    HttpClientJsonpModule, 
    ReactiveFormsModule, 
    NgZorroAntdModule, 
    ScrollingModule, 
    DragDropModule,
    NzSelectModule,
    NzStatisticModule,
    NzToolTipModule,
    NzMenuModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } , {
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  }, CacheRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
