import { Component, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgFor, NgIf } from '@angular/common';
import { InputDinamicoIngredienteComponent } from '../input-dinamico-ingrediente/input-dinamico-ingrediente.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Receta } from '../receta';
import { RecetasService } from '../recetas.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-crear-receta',
    standalone: true,
    templateUrl: './crear-receta.component.html',
    styleUrl: './crear-receta.component.scss',
    imports: [HeaderComponent, NgFor, NgIf, InputDinamicoIngredienteComponent, FormsModule, RouterModule]
})
export class CrearRecetaComponent {

    @ViewChild('formularioIngredientes') formularioIngredientes!: NgForm;
    ingredientes: {ingrediente: string, cantidad: string}[] = [];

    
    recetaAEditar?: Receta;

    
    imagenPlaceholder: string = 'https://via.placeholder.com/150';
    imagenValue: string = '';
    nombreValue: string = '';
    categoriaValue: string = '';
    areaValue: string = '';
    preparacionValue: string = '';


    constructor(private recetasService: RecetasService, private router: Router) { }

    onCambioIngredientes(event: {ingrediente: string, cantidad: string}[]) {
        this.ingredientes = event;
    }

    onSubmit(formularioPrincipal: NgForm) {

        if (formularioPrincipal.invalid) {
            console.log("Formulario invalido");
            return;
        }

        let receta : Receta = {
            id: this.recetaAEditar ? this.recetaAEditar.id : null,
            nombre: formularioPrincipal.value.nombre,
            imagen: formularioPrincipal.value.imagen,
            categoria: formularioPrincipal.value.categoria,
            area: formularioPrincipal.value.area,
            ingredientes: {},
            preparacion: formularioPrincipal.value.preparacion,
            guardada: false
        }

        for (let ingrediente of this.ingredientes) {
            receta.ingredientes[ingrediente.ingrediente] = ingrediente.cantidad;
        }

        console.log(receta);

        this.crearReceta(receta);
    }

    crearReceta(receta: Receta) {
        this.recetasService.crearReceta(receta).subscribe({
            next: () => {
                console.log("Receta creada");
                this.router.navigate(['/mis-recetas']);
            },
            error: (error) => {
                console.log("Error al crear receta: ", error);
            }
        });
    }

    ngOnInit() {
        this.getRecetaAEditar();
    }

    getRecetaAEditar() {
        this.recetaAEditar = this.recetasService.getRecetaAEditar();

        if (this.recetaAEditar) {
            this.imagenPlaceholder = this.recetaAEditar.imagen || 'https://via.placeholder.com/150';
            this.imagenValue = this.recetaAEditar.imagen || '';
            this.nombreValue = this.recetaAEditar.nombre || '';
            this.categoriaValue = this.recetaAEditar.categoria || '';
            this.areaValue = this.recetaAEditar.area || '';
            this.preparacionValue = this.recetaAEditar.preparacion || '';
        }
    }
}
