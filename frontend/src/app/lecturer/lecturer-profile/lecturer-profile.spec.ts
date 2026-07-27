import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerProfile } from './lecturer-profile';

describe('LecturerProfile', () => {
  let component: LecturerProfile;
  let fixture: ComponentFixture<LecturerProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
