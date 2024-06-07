import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Receta } from '../receta';
import { RecetasService } from '../recetas.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.scss'
})
export class BuscadorComponent {

  recetas: Receta[] = [];

  @Output() recetasBuscadasCambio = new EventEmitter<Receta[]>();

  private searchTerms = new Subject<string>();

  constructor(private recetasService: RecetasService) {
    
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  emitirCambio() {
    this.recetasBuscadasCambio.emit(this.recetas);
    console.log("Cambio emitido");
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.recetasService.buscarRecetas(term)),
    ).subscribe(recetas => {
      this.recetas = recetas;
      this.emitirCambio();
    });
  }
}
