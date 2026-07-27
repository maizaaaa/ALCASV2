import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerSchedule } from './lecturer-schedule';

describe('LecturerSchedule', () => {
  let component: LecturerSchedule;
  let fixture: ComponentFixture<LecturerSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerSchedule],
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
