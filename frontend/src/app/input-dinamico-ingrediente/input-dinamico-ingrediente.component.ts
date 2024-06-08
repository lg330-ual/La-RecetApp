import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecetasService } from '../recetas.service';

@Component({
  selector: 'app-input-dinamico-ingrediente',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './input-dinamico-ingrediente.component.html',
  styleUrl: './input-dinamico-ingrediente.component.scss'
})
export class InputDinamicoIngredienteComponent {

  rec = { ingredientes: [{ingrediente: '', cantidad: ''}]}

  @Output() ingredientesCambio = new EventEmitter<{ingrediente: string, cantidad: string}[]>();

  constructor(private recetasService: RecetasService) { }

  addIngrediente() {
    this.rec.ingredientes.push({ingrediente: '', cantidad: ''});
    this.emitirCambio();
  }

  removeIngrediente(index: number) {
    this.rec.ingredientes.splice(index,1);
    this.emitirCambio();
  }
  
  emitirCambio() {
    this.ingredientesCambio.emit(this.rec.ingredientes);
  }

  // T-77 Implementar que al editar una receta, se muestren los ingredientes en el formulario
  ngOnInit() {
    
  }
}
