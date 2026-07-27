import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsReports } from './analytics-reports';

describe('AnalyticsReports', () => {
  let component: AnalyticsReports;
  let fixture: ComponentFixture<AnalyticsReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsReports],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
