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
    console.log(event);
    event.srcElement.classList.add('selected');
  }

  handleSideNavStyles(route){
    if(this.showSideNav){
      if(route == '/home'){

        let testElement = document.getElementsByClassName('navItemHome');
        let testElement1 = document.getElementsByClassName('navItemLibrary');
        let testElement2 = document.getElementsByClassName('navItemRecent');

        for(let i=0 ; i<testElement.length ; i++){
          testElement[i].classList.add('selected');
        }

        for(let i=0 ; i<testElement1.length ; i++){
          testElement[i].classList.remove('selected');
        }

        for(let i=0 ; i<testElement2.length ; i++){
          testElement[i].classList.remove('selected');
        }


  
      } else if(route == '/myplaylist'){

        let testElement = document.getElementsByClassName('navItemLibrary');
        let testElement1 = document.getElementsByClassName('navItemLibrary');
        let testElement2 = document.getElementsByClassName('navItemRecent');

        for(let i=0 ; i<testElement.length ; i++){
          testElement[i].classList.remove('selected');
        }

        for(let i=0 ; i<testElement1.length ; i++){
          testElement[i].classList.add('selected');
        }

        for(let i=0 ; i<testElement2.length ; i++){
          testElement[i].classList.remove('selected');
        }

      } else if (route == '/recent'){

        let testElement = document.getElementsByClassName('navItemRecent');
        let testElement1 = document.getElementsByClassName('navItemLibrary');
        let testElement2 = document.getElementsByClassName('navItemRecent');

        for(let i=0 ; i<testElement.length ; i++){
          testElement[i].classList.remove('selected');
        }

        for(let i=0 ; i<testElement1.length ; i++){
          testElement[i].classList.remove('selected');
        }

        for(let i=0 ; i<testElement2.length ; i++){
          testElement[i].classList.add('selected');
        }

      } else if (route == ''){
        // let element = document.getElementsByTagName('mat-icon')[0];
        // let element1 = document.getElementsByClassName('interactablesLabel')[0];
        // let element2 = document.getElementsByTagName('mat-icon')[1];
        // let element3 = document.getElementsByClassName('interactablesLabel')[1];
        // let element4 = document.getElementsByTagName('mat-icon')[2];
        // let element5 = document.getElementsByClassName('interactablesLabel')[2];
  
  
        // element.classList.add('selected');
        // element1.classList.add('selected');
  
        // element2.classList.remove('selected');
        // element3.classList.remove('selected');
        // element4.classList.remove('selected');
        // element5.classList.remove('selected');


        let testElement = document.getElementsByClassName('navItemHome');
        let testElement1 = document.getElementsByClassName('navItemLibrary');
        let testElement2 = document.getElementsByClassName('navItemRecent');

        for(let i=0 ; i<testElement.length ; i++){
          testElement[i].classList.add('selected');
        }

        for(let i=0 ; i<testElement1.length ; i++){
          testElement[i].classList.remove('selected');
        }

        for(let i=0 ; i<testElement2.length ; i++){
          testElement[i].classList.remove('selected');
        }

        for(let i=0 ; i<testElement.length ; i++){
          testElement[i].classList.add('selected');
        }
      }
    }
  }
}
