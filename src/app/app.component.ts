import { Component, HostListener } from '@angular/core';
import { ApplicationStateService } from './services/application-state/application-state.service';
import { SpotifyService } from './services/spotify-service/spotify.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bharathck';

  constructor(private applicationStateService: ApplicationStateService , private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.HandleResolutionChange();
  }

  HandleResolutionChange() {
    if (window.innerWidth < 768) {
      this.applicationStateService.resChange.next(true);
    } else {
      this.applicationStateService.resChange.next(false);
    }
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event) {
    this.applicationStateService.notifyWindowResize(event.target.innerWidth);
    if (event.target.innerWidth < 768) {
      // trigger mobile routes
      let isMobile: Boolean = true;
      this.applicationStateService.handleResolutionChange(isMobile);
    } else {
      let isMobile: Boolean = false;
      this.applicationStateService.handleResolutionChange(isMobile);
    }
  }

}


export function debounce(delay: number = 500): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const timeoutKey = Symbol();

    const original = descriptor.value;

    descriptor.value = function (...args) {
      clearTimeout(this[timeoutKey]);
      this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
