import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryMeterComponent } from './memory-meter.component';

describe('MemoryMeterComponent', () => {
  let component: MemoryMeterComponent;
  let fixture: ComponentFixture<MemoryMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
