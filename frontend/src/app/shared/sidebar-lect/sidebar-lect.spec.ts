import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLect } from './sidebar-lect';

describe('SidebarLect', () => {
  let component: SidebarLect;
  let fixture: ComponentFixture<SidebarLect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLect],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarLect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
