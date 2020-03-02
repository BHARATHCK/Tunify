import { Component } from '@angular/core';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'bharathck';

  constructor() { }

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

}
