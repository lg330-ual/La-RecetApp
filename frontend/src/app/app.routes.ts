import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { MisRecetasComponent } from './mis-recetas/mis-recetas.component';

export const routes: Routes = [
    { path: '', component: MenuPrincipalComponent },
    { path: 'mis-recetas', component: MisRecetasComponent}
];
