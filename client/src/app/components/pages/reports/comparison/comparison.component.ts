import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
  loadingOpts = {
    text: 'Загрузка...',
  };

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 300);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 3000);
  }
}
