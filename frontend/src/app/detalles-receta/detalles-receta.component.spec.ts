import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRecetaComponent } from './detalles-receta.component';

describe('DetallesRecetaComponent', () => {
  let component: DetallesRecetaComponent;
  let fixture: ComponentFixture<DetallesRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesRecetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
