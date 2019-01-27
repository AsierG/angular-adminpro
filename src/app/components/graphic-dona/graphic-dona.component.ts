import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-dona',
  templateUrl: './graphic-dona.component.html',
  styleUrls: []
})
export class GraphicDonaComponent implements OnInit {

  @Input('chartLabels') public doughnutChartLabels: string[] = [];
  @Input('chartData') public doughnutChartData: number[] = [];
  @Input('chartType')  public doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
