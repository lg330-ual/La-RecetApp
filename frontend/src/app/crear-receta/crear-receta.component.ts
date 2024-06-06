import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgFor } from '@angular/common';
import { InputDinamicoIngredienteComponent } from '../input-dinamico-ingrediente/input-dinamico-ingrediente.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Receta } from '../receta';
import { RecetasService } from '../recetas.service';

@Component({
    selector: 'app-crear-receta',
    standalone: true,
    templateUrl: './crear-receta.component.html',
    styleUrl: './crear-receta.component.scss',
    imports: [HeaderComponent, NgFor, InputDinamicoIngredienteComponent, FormsModule]
})
export class CrearRecetaComponent {

    @ViewChild('formularioIngredientes') formularioIngredientes!: NgForm;

    constructor(private recetasService: RecetasService) { }

    onSubmit(formularioPrincipal: NgForm) {
        let receta : Receta = {
            id: 0,
            nombre: String = formularioPrincipal.value.nombre,
            imagen: String = formularioPrincipal.value.imagen,
            categoria: String = formularioPrincipal.value.categoria,
            area: String = formularioPrincipal.value.area,
            ingredientes: {},
            preparacion: String = formularioPrincipal.value.preparacion,
            guardada: false
        }

        for (let i = 0; i < this.formularioIngredientes.value.ingredientes.length; i++) {
            let ingrediente = this.formularioIngredientes.value.ingredientes[i];
            let cantidad = this.formularioIngredientes.value.cantidades[i];
            receta.ingredientes[ingrediente] = cantidad;
        }
    }

    crearReceta(receta: Receta) {
        this.recetasService.crearReceta(receta).subscribe();
    }
}
