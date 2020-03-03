import { Injectable } from '@angular/core';
import { Observable , of , BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  public resChange: BehaviorSubject<any> = new BehaviorSubject(false);
  public resChangeNotifier: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() { 

  }

  handleResolutionChange(isMobile){
      this.resChange.next(isMobile);
  }

  notifyWindowResize(width){
    this.resChangeNotifier.next(width);
  }

}
