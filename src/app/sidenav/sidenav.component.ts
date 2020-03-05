import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Location } from "@angular/common";
import { ApplicationStateService } from '../services/application-state/application-state.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  showSideNav: Boolean = false;

  constructor(private router: Router , private activeRoute: ActivatedRoute , location: Location , private applicationStateService: ApplicationStateService) {
    router.events.subscribe(val => {
      this.handleSideNavStyles(location.path());
    });
   }

  ngOnInit(): void {
    this.applicationStateService.resChange.subscribe(
      isMobile => {
        this.showSideNav = !isMobile;
      }
    )
  }

  routeTo(route){
    this.handleSideNavStyles(route);
    this.router.navigate([`${route}`]);
  }

  highlight(event){
    event.srcElement.classList.add('selected');
  }

  handleSideNavStyles(route){

    if(route == '/home' || route == ''){

      let element1 = document.getElementsByClassName('colorHome');
      let element2 = document.getElementsByClassName('colorPlaylist');
      let element3 = document.getElementsByClassName('colorRecent');
  
      for(let i=0 ; i< element1.length ; i++){
        element1[i].classList.add('selected');
      }
      for(let i=0 ; i< element2.length ; i++){
        element2[i].classList.remove('selected');
      }
      for(let i=0 ; i< element3.length ; i++){
        element3[i].classList.remove('selected');
      }

    }
    if(route == '/myplaylist'){

      let element1 = document.getElementsByClassName('colorHome');
      let element2 = document.getElementsByClassName('colorPlaylist');
      let element3 = document.getElementsByClassName('colorRecent');
  
      for(let i=0 ; i< element1.length ; i++){
        element1[i].classList.remove('selected');
      }
      for(let i=0 ; i< element2.length ; i++){
        element2[i].classList.add('selected');
      }
      for(let i=0 ; i< element3.length ; i++){
        element3[i].classList.remove('selected');
      }      

    }

    if(route == '/recent'){

      let element1 = document.getElementsByClassName('colorHome');
      let element2 = document.getElementsByClassName('colorPlaylist');
      let element3 = document.getElementsByClassName('colorRecent');
  
      for(let i=0 ; i< element1.length ; i++){
        element1[i].classList.remove('selected');
      }
      for(let i=0 ; i< element2.length ; i++){
        element2[i].classList.remove('selected');
      }
      for(let i=0 ; i< element3.length ; i++){
        element3[i].classList.add('selected');
      } 

    }
  }
}
