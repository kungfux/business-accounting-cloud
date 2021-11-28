import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import {
  Detalization,
  ReportApiService,
} from 'src/app/services/api/report.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-income-report',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeReportComponent implements OnInit, AfterViewInit {
  toolBarMode: ToolBarMode = ToolBarMode.None;
  loading: boolean = false;
  filterShow: boolean = false;
  filterRangeStart?: Date = undefined;
  filterRangeEnd?: Date = undefined;
  filterDetalization: string = 'month';
  options: EChartsOption = {};
  loadingOpts = {
    text: 'Загрузка...',
  };

  constructor(
    private reportApi: ReportApiService,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.filterRangeStart = new Date(2008, 1, 1, 0, 0, 0, 0);
    this.filterRangeEnd = new Date(2021, 12, 31, 23, 59, 59, 999);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = !this.loading;
      this.buildReport();
    }, 100);
  }

  buildReport() {
    let detalization: Detalization = Detalization.month;
    switch (this.filterDetalization) {
      case 'month':
        detalization = Detalization.month;
        break;
      case 'week':
        detalization = Detalization.week;
        break;
      case 'day':
        detalization = Detalization.day;
        break;
    }

    this.reportApi
      .getPureIncomeDetalized(
        this.userPreferences.companyId!,
        this.filterRangeStart!,
        this.filterRangeEnd!,
        detalization
      )
      .subscribe({
        next: (data) => {
          this.options = {
            xAxis: {},
            yAxis: { type: 'category' },
            dataset: {
              source: data,
            },
            series: [
              {
                type: 'line',
                encode: {
                  x: 'month',
                  y: 'total',
                },
              },
            ],
          };
          this.loading = !this.loading;
        },
      });
  }

  // this.options = {
  //   toolbox: {
  //     left: 'center',
  //     itemSize: 25,
  //     top: 0,
  //     feature: {
  //       dataZoom: {
  //         yAxisIndex: 'none',
  //       },
  //       restore: {},
  //     },
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     formatter: '{b} - {c} руб.',
  //   },
  //   legend: {
  //     left: 'right',
  //     data: years.map(String),
  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: xAxisCategoryNames,
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: this.buildSeries(years, seriesData),

  // buildSeries(years: number[], seriesData: number[][]): any {
  //   let series = [];
  //   for (let index = 0; index < seriesData.length; index++) {
  //     const serie = seriesData[index];
  //     series.push({
  //       name: years[index],
  //       data: serie,
  //       type: 'line',
  //       showAllSymbol: 'auto',
  //       showSymbol: true,
  //       markLine: {
  //         data: [{ type: 'average', name: 'Avg' }],
  //       },
  //     });
  //   }
  //   return series;
  // }

  onFiltersRequest() {
    this.filterShow = !this.filterShow;
  }

  rebuildReport() {
    this.buildReport();
  }
}
