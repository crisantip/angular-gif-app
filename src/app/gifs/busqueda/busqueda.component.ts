import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Ver https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;  // ! Non-null assertion operator

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    console.log( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
