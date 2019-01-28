import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-dona',
  templateUrl: './graphic-dona.component.html',
  styleUrls: []
})
export class GraphicDonaComponent implements OnInit {

  @Input() public chartLabels: string[] = [];
  @Input() public chartData: number[] = [];
  @Input()  public chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
