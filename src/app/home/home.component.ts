import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../services/application-state/application-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentArray = [1,2,3,4,5,6,7];

  constructor(private applicationStateService: ApplicationStateService) { }

  ngOnInit(): void {
   this.handleWindowResize();
  }

  handleWindowResize(){
    this.applicationStateService.resChangeNotifier.subscribe(
      res => {
        if(res){
          if(res < 1428){
            this.recentArray.pop();
          }
          if(res < 1238){
            this.recentArray.pop();
          }
          if(res < 1048){
            this.recentArray.pop();
          }
          if(res < 858){
            this.recentArray.pop();
          }
        }
      }
    )
  }

}
