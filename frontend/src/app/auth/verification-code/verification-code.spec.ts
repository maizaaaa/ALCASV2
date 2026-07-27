import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { VerificationCode } from './verification-code';

describe('VerificationCode', () => {
  let component: VerificationCode;
  let fixture: ComponentFixture<VerificationCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationCode],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
