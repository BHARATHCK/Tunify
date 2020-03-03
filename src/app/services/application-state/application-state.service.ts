import { Injectable } from '@angular/core';
import { Observable , of , BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  public resChange: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { 

  }

  handleResolutionChange(isMobile){
      this.resChange.next(isMobile);
  }

}
