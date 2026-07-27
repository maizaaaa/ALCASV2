import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationLogs } from './consultation-logs';

describe('ConsultationLogs', () => {
  let component: ConsultationLogs;
  let fixture: ComponentFixture<ConsultationLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationLogs],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
