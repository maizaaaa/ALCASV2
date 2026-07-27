import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppointments } from './student-appointments';

describe('StudentAppointments', () => {
  let component: StudentAppointments;
  let fixture: ComponentFixture<StudentAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAppointments],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
