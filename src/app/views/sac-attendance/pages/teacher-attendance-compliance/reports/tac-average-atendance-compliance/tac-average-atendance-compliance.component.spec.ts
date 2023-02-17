import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacAverageAtendanceComplianceComponent } from './tac-average-atendance-compliance.component';

describe('TacAverageAtendanceComplianceComponent', () => {
  let component: TacAverageAtendanceComplianceComponent;
  let fixture: ComponentFixture<TacAverageAtendanceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacAverageAtendanceComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacAverageAtendanceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
