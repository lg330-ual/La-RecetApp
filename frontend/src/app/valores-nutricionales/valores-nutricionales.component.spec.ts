import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresNutricionalesComponent } from './valores-nutricionales.component';

describe('ValoresNutricionalesComponent', () => {
  let component: ValoresNutricionalesComponent;
  let fixture: ComponentFixture<ValoresNutricionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValoresNutricionalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValoresNutricionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
