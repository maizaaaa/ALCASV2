import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastHub } from './broadcast-hub';

describe('BroadcastHub', () => {
  let component: BroadcastHub;
  let fixture: ComponentFixture<BroadcastHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BroadcastHub],
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastHub);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
