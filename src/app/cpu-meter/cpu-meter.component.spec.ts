import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuMeterComponent } from './cpu-meter.component';

describe('CpuMeterComponent', () => {
  let component: CpuMeterComponent;
  let fixture: ComponentFixture<CpuMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
