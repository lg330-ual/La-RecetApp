import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { CardRecetaComponent } from '../card-receta/card-receta.component';
import { Receta } from '../receta';
import { RecetasService } from '../recetas.service';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DetallesRecetaComponent } from '../detalles-receta/detalles-receta.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [HeaderComponent, BuscadorComponent, CardRecetaComponent, NgFor, RouterModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.scss'
})
export class MenuPrincipalComponent {
  listaRecetasRandom: Receta[] = [];

  constructor(private recetasService: RecetasService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRecetasRandom();
  }

  getRecetasRandom(): void {
    for (let i = 0; i < 30; i++) {
      this.recetasService.getRecetaRandom()
        .subscribe(receta => this.listaRecetasRandom.push(receta));
    }
  }
}
