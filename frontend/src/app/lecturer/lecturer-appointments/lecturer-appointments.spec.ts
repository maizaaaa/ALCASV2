import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerAppointments } from './lecturer-appointments';

describe('LecturerAppointments', () => {
  let component: LecturerAppointments;
  let fixture: ComponentFixture<LecturerAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerAppointments],
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
