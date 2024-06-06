import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetallesRecetaComponent } from './detalles-receta/detalles-receta.component';
import { Receta } from './receta';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupsService {
  private popupClosedSource = new Subject<any>();
  popupClosed$ = this.popupClosedSource.asObservable();

  constructor(private dialog: MatDialog) { }

  openPopUp(receta: Receta) {
    const dialogRef = this.dialog.open(DetallesRecetaComponent, {
      data: {receta}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.popupClosedSource.next(result);
    });

    return dialogRef;
  }

  closePopUp(): void {
    this.dialog.closeAll();
  }
  
}
