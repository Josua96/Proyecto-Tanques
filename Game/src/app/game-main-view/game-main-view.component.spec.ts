import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMainViewComponent } from './game-main-view.component';

describe('GameMainViewComponent', () => {
  let component: GameMainViewComponent;
  let fixture: ComponentFixture<GameMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
