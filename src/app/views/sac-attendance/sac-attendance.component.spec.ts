import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacAttendanceComponent } from './sac-attendance.component';

describe('SacAttendanceComponent', () => {
  let component: SacAttendanceComponent;
  let fixture: ComponentFixture<SacAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
