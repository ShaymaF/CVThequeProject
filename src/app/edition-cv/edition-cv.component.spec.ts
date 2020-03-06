import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionCVComponent } from './edition-cv.component';

describe('EditionCVComponent', () => {
  let component: EditionCVComponent;
  let fixture: ComponentFixture<EditionCVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionCVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
