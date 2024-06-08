import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { MisRecetasComponent } from './mis-recetas/mis-recetas.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';
import { ValoresNutricionalesComponent } from './valores-nutricionales/valores-nutricionales.component';

export const routes: Routes = [
    { path: '', component: MenuPrincipalComponent },
    { path: 'mis-recetas', component: MisRecetasComponent},
    { path: 'crear-receta', component: CrearRecetaComponent},
    { path: 'editar-receta', component: CrearRecetaComponent},
    { path: 'valores-nutricionales', component: ValoresNutricionalesComponent},
];
