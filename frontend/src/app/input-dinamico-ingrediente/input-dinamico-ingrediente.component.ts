import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-dinamico-ingrediente',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './input-dinamico-ingrediente.component.html',
  styleUrl: './input-dinamico-ingrediente.component.scss'
})
export class InputDinamicoIngredienteComponent {

  rec = { ingredientes: [{ingrediente: '', cantidad: ''}]}

  addIngrediente() {
    this.rec.ingredientes.push({ingrediente: '', cantidad: ''});
  }

  removeIngrediente(index: number) {
    this.rec.ingredientes.splice(index,1);
  }
  
  onSubmit() {
    console.log(this.rec);
  }
}
