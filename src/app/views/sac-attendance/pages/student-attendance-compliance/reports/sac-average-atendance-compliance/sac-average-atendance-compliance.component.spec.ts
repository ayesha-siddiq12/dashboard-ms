import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacAverageAtendanceComplianceComponent } from './sac-average-atendance-compliance.component';

describe('SacAverageAtendanceComplianceComponent', () => {
  let component: SacAverageAtendanceComplianceComponent;
  let fixture: ComponentFixture<SacAverageAtendanceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacAverageAtendanceComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacAverageAtendanceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
