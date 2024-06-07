import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { RecetasService } from '../recetas.service';
import { Receta } from '../receta';
import { CardRecetaComponent } from '../card-receta/card-receta.component';
import { NgFor, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupsService } from '../popups.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mis-recetas',
  standalone: true,
  templateUrl: './mis-recetas.component.html',
  styleUrl: './mis-recetas.component.scss',
  imports: [
    HeaderComponent,
    BuscadorComponent,
    CardRecetaComponent,
    NgFor,
    NgIf,
    MatDialogModule,
    RouterModule
  ],
})
export class MisRecetasComponent {
  recetasCreadas: Receta[] = [];
  recetasGuardadas: Receta[] = [];

  constructor(
    private recetasService: RecetasService,
    private popupsService: PopupsService
  ) {}

  ngOnInit(): void {
    this.getRecetasGuardadas();
    this.getRecetasCreadas();

    this.popupsService.popupClosed$.subscribe((result) => {
      this.getRecetasGuardadas();
      this.getRecetasCreadas();
    });
  }

  getRecetasGuardadas(): void {
    this.recetasService
      .getRecetasGuardadas()
      .subscribe((recetas) => (this.recetasGuardadas = recetas));
  }

  getRecetasCreadas(): void {
    this.recetasService.getRecetasCreadas().subscribe(
      (recetas) => (this.recetasCreadas = recetas),
    );
  }

  /*openPopUp(receta: Receta): void {
    this.popupsService.openPopUp(receta);
  }*/
}
