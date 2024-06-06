import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDinamicoIngredienteComponent } from './input-dinamico-ingrediente.component';

describe('InputDinamicoIngredienteComponent', () => {
  let component: InputDinamicoIngredienteComponent;
  let fixture: ComponentFixture<InputDinamicoIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDinamicoIngredienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDinamicoIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
