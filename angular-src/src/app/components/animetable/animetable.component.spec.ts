import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimetableComponent } from './animetable.component';

describe('AnimetableComponent', () => {
  let component: AnimetableComponent;
  let fixture: ComponentFixture<AnimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
