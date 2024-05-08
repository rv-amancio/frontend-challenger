import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResponseDefaultComponent } from './home-response-default.component';

describe('HomeResponseDefaultComponent', () => {
  let component: HomeResponseDefaultComponent;
  let fixture: ComponentFixture<HomeResponseDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResponseDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeResponseDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
