import { TestBed } from '@angular/core/testing';

import { SpotifySevriceService } from './spotify-sevrice.service';

describe('SpotifySevriceService', () => {
  let service: SpotifySevriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifySevriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
