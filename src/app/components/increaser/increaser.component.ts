import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('txtPercentage') txtPercentage: ElementRef;

  @Input('legendName') legend: string = 'Legend';
  @Input() percentage: number = 50;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log(`Legend: ${this.legend}, percentage: ${this.percentage}`);
   }

  ngOnInit() {
    // console.log(`Legend: ${this.legend}, percentage: ${this.percentage}`);
  }

  onChanges(newValue: number) {
    console.log(`New Value: ${newValue}`);
    if ( newValue >= 100) {
      this.percentage = 100;
    } else if ( newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }
    this.txtPercentage.nativeElement.value = this.percentage;
    this.valueChange.emit(this.percentage);

  }

  cambiarValor(valor: number) {
    if (valor > 0 && this.percentage >= 100) {
      return;
    }
    if (valor < 0 && this.percentage <= 0) {
      return;
    }
    this.percentage = this.percentage + valor;
    this.valueChange.emit(this.percentage);

    this.txtPercentage.nativeElement.focus();
  }

}
