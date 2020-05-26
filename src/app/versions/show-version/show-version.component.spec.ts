import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVersionComponent } from './show-version.component';

describe('ShowVersionComponent', () => {
  let component: ShowVersionComponent;
  let fixture: ComponentFixture<ShowVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
