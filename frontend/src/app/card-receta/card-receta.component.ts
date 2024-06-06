import { Component, Input } from '@angular/core';
import { Receta } from '../receta';
import { NgIf } from '@angular/common';
import { RecetasService } from '../recetas.service';
import { PopupsService } from '../popups.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MisRecetasComponent } from '../mis-recetas/mis-recetas.component';

@Component({
  selector: 'app-card-receta',
  standalone: true,
  imports: [NgIf, MatDialogModule],
  templateUrl: './card-receta.component.html',
  styleUrl: './card-receta.component.scss',
})
export class CardRecetaComponent {
  @Input()
  receta?: Receta;

  constructor(
    private recetasService: RecetasService,
    private popupsService: PopupsService
  ) {}

  getRecetaRandom(): void {
    this.recetasService
      .getRecetaRandom()
      .subscribe((receta) => (this.receta = receta));
  }

  guardarReceta(): void {
    if (this.receta != undefined) {
      this.receta.guardada = true;
      this.recetasService.guardarReceta(this.receta).subscribe();
    }
  }

  openPopUp(): void {
    const dialogRef = this.popupsService.openPopUp(this.receta!);
    dialogRef.afterClosed().subscribe();
  }
}
