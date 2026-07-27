import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerHistory } from './lecturer-history';

describe('LecturerHistory', () => {
  let component: LecturerHistory;
  let fixture: ComponentFixture<LecturerHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
