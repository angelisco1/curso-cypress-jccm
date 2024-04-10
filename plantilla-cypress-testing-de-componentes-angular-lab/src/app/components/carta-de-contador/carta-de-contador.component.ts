import { Component, Input } from '@angular/core';
import { ContadorComponent } from '../contador/contador.component';
import { TituloComponent } from '../titulo/titulo.component';

@Component({
  selector: 'app-carta-de-contador',
  standalone: true,
  imports: [ContadorComponent, TituloComponent],
  templateUrl: './carta-de-contador.component.html',
  styleUrl: './carta-de-contador.component.css'
})
export class CartaDeContadorComponent {
  @Input() titulo: string = 'Contador';
  @Input() cuentaInicial: number = 0;

  cuenta: number = this.cuentaInicial;

  ngOnInit() {
    this.cuenta = this.cuentaInicial;
  }

  incrementar() {
    this.cuenta++;
  }

  decrementar() {
    if (this.cuenta - 1 >= 0) {
      this.cuenta--;
    }
  }
}
