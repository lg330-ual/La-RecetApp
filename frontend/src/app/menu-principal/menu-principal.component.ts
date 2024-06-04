import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BuscadorComponent } from '../buscador/buscador.component';
import { CardRecetaComponent } from '../card-receta/card-receta.component';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [HeaderComponent, BuscadorComponent, CardRecetaComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.scss'
})
export class MenuPrincipalComponent {

}
