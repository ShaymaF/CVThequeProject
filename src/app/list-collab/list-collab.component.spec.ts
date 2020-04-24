import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollabComponent } from './list-collab.component';

describe('ListCollabComponent', () => {
  let component: ListCollabComponent;
  let fixture: ComponentFixture<ListCollabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCollabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
