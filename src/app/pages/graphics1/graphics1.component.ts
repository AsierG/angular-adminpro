import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {

  graphics: any = {
    'graphic1': {
      'labels': ['Con mantequilla', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'legend': 'El pan se come con'
    },
    'graphic2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'legend': 'Entrevistados'
    },
    'graphic3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'legend': '¿Mañana hara buen tiempo?'
    },
    'graphic4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'legend': '¿Prefiere coche de gasolina?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
