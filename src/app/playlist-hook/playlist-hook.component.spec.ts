import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHookComponent } from './playlist-hook.component';

describe('PlaylistHookComponent', () => {
  let component: PlaylistHookComponent;
  let fixture: ComponentFixture<PlaylistHookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistHookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistHookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
