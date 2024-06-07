import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Receta } from '../receta';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RecetasService } from '../recetas.service';
import { Router, RouterModule } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-detalles-receta',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './detalles-receta.component.html',
  styleUrl: './detalles-receta.component.scss',
})
export class DetallesRecetaComponent {
  receta: Receta | undefined;
  esCreada?: boolean;

  @Output() dialogClosed = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<DetallesRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recetasService: RecetasService,
    private router: Router
  ) {
    this.receta = data.receta;
    this.esCreada = data.esCreada;
  }

  guardarReceta(): void {
    if (this.receta != undefined) {
      this.receta.guardada = true;
      this.recetasService.guardarReceta(this.receta).subscribe();
    }
  }

  quitarRecetaGuardada(): void {
    if (this.receta != undefined) {
      this.recetasService.quitarRecetaGuardada(this.receta).subscribe();
      this.receta.guardada = false;
      this.closeDialog();
    }
  }

  eliminarReceta(): void {
    if (this.receta != undefined) {
      this.recetasService.eliminarReceta(this.receta).subscribe();
      this.closeDialog();
    }
  }

  toEditarReceta() {
    this.closeDialog();
    this.recetasService.setRecetaAEditar(this.receta!);
    this.router.navigate(['/editar-receta']);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
