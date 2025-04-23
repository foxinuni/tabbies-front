import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarianComponent } from './veterinarian.component';

describe('VeterinarianComponent', () => {
  let component: VeterinarianComponent;
  let fixture: ComponentFixture<VeterinarianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarianComponent]
    });
    fixture = TestBed.createComponent(VeterinarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
