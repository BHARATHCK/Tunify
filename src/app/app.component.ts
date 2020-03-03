import { Component, HostListener } from '@angular/core';  
import { ApplicationStateService} from './services/application-state/application-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'bharathck';

  constructor(private applicationStateService: ApplicationStateService) { }

  ngOnInit() { 
    this.HandleResolutionChange();
   }

   HandleResolutionChange(){
     if(window.innerWidth < 768){
       console.log('is MOBILE');
     } else {
       console.log('is desktop');
     }
   }

  @HostListener('window:resize', ['$event'])
  onResize(event){
   if(event.target.innerWidth < 768){
     // trigger mobile routes
     let isMobile:Boolean = true;
     this.applicationStateService.handleResolutionChange(isMobile);
   } else {
    let isMobile:Boolean = false;
     this.applicationStateService.handleResolutionChange(isMobile);
   }
  }

}
