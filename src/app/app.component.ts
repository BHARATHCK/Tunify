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
       this.applicationStateService.resChange.next(true);
     } else {
      this.applicationStateService.resChange.next(false);
     }
   }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.applicationStateService.notifyWindowResize(event.target.innerWidth);
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
