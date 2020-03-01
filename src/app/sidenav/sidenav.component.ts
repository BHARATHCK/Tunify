import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router , private activeRoute: ActivatedRoute , location: Location) {
    router.events.subscribe(val => {
      this.handleSideNavStyles(location.path());
    });
   }

  ngOnInit(): void {
    
  }

  routeTo(route){
    this.handleSideNavStyles(route);
    this.router.navigate([`${route}`]);
  }

  handleSideNavStyles(route){
    if(route == '/home'){
      let element = document.getElementsByTagName('mat-icon')[0];
      let element1 = document.getElementsByClassName('interactablesLabel')[0];
      let element2 = document.getElementsByTagName('mat-icon')[1];
      let element3 = document.getElementsByClassName('interactablesLabel')[1];
      let element4 = document.getElementsByTagName('mat-icon')[2];
      let element5 = document.getElementsByClassName('interactablesLabel')[2];

      element.classList.add('selected');
      element1.classList.add('selected');

      element2.classList.remove('selected');
      element3.classList.remove('selected');
      element4.classList.remove('selected');
      element5.classList.remove('selected');

    } else if(route == '/myplaylist'){
      let element = document.getElementsByTagName('mat-icon')[0];
      let element1 = document.getElementsByClassName('interactablesLabel')[0];
      let element2 = document.getElementsByTagName('mat-icon')[1];
      let element3 = document.getElementsByClassName('interactablesLabel')[1];
      let element4 = document.getElementsByTagName('mat-icon')[2];
      let element5 = document.getElementsByClassName('interactablesLabel')[2];

      element.classList.remove('selected');
      element1.classList.remove('selected');

      element2.classList.add('selected');
      element3.classList.add('selected');
      element4.classList.remove('selected');
      element5.classList.remove('selected');
    } else if (route == '/recent'){
      let element = document.getElementsByTagName('mat-icon')[0];
      let element1 = document.getElementsByClassName('interactablesLabel')[0];
      let element2 = document.getElementsByTagName('mat-icon')[1];
      let element3 = document.getElementsByClassName('interactablesLabel')[1];
      let element4 = document.getElementsByTagName('mat-icon')[2];
      let element5 = document.getElementsByClassName('interactablesLabel')[2];

      element.classList.remove('selected');
      element1.classList.remove('selected');

      element2.classList.remove('selected');
      element3.classList.remove('selected');
      element4.classList.add('selected');
      element5.classList.add('selected');
    }
  }
}
