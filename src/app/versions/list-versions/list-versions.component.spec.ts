import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVersionsComponent } from './list-versions.component';

describe('ListVersionsComponent', () => {
  let component: ListVersionsComponent;
  let fixture: ComponentFixture<ListVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
