import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCounterComponent } from './treatment-counter.component';

describe('TreatmentCounterComponent', () => {
  let component: TreatmentCounterComponent;
  let fixture: ComponentFixture<TreatmentCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentCounterComponent]
    });
    fixture = TestBed.createComponent(TreatmentCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
