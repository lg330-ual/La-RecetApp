import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ValoresNutricionalesService } from './valores-nutricionales.service';
import { ValoresNutricionalesDto } from './valores-nutricionales-dto';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-valores-nutricionales',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './valores-nutricionales.component.html',
  styleUrl: './valores-nutricionales.component.scss'
})
export class ValoresNutricionalesComponent {

  valoresNutricionales: ValoresNutricionalesDto[] = [];

  constructor(private valoresNutricionalesService: ValoresNutricionalesService) { }

  getValoresNutricionales() {
    this.valoresNutricionalesService.getValoresNutricionales().subscribe(
      valoresNutricionales => this.valoresNutricionales = valoresNutricionales
    )
  }

  ngOnInit() {
    this.getValoresNutricionales();
  }
}
