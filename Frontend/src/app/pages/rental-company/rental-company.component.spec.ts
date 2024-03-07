import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalCompanyComponent } from './rental-company.component';

describe('RentalCompanyComponent', () => {
  let component: RentalCompanyComponent;
  let fixture: ComponentFixture<RentalCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalCompanyComponent]
    });
    fixture = TestBed.createComponent(RentalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
