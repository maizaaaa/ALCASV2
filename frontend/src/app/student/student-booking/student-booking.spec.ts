import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBooking } from './student-booking';

describe('StudentBooking', () => {
  let component: StudentBooking;
  let fixture: ComponentFixture<StudentBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBooking],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
