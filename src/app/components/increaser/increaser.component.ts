import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html'
})
export class IncreaserComponent implements OnInit {

  @Input('legendName') legend: string = 'Legend';
  @Input() percentage: number = 50;

  constructor() {
    console.log(`Legend: ${this.legend}, percentage: ${this.percentage}`);
   }

  ngOnInit() {
    console.log(`Legend: ${this.legend}, percentage: ${this.percentage}`);
  }

  cambiarValor(valor: number) {
    if (valor > 0 && this.percentage >= 100) {
      return;
    }
    if (valor < 0 && this.percentage <= 0) {
      return;
    }
    this.percentage = this.percentage + valor;
  }

}
