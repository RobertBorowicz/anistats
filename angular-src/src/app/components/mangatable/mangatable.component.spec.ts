import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangatableComponent } from './mangatable.component';

describe('MangatableComponent', () => {
  let component: MangatableComponent;
  let fixture: ComponentFixture<MangatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
