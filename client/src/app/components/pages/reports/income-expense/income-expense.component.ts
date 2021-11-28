import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css'],
})
export class IncomeExpenseComponent implements OnInit, AfterViewInit {
  toolBarMode: ToolBarMode = ToolBarMode.None;
  loading: boolean = false;
  filterShow: boolean = false;
  filterRangeStart?: Date = undefined;
  filterRangeEnd?: Date = undefined;
  options: EChartsOption = {};
  loadingOpts = {
    text: 'Загрузка...',
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = !this.loading;
      this.buildReport();
    }, 100);
  }

  buildReport() {}

  onFiltersRequest() {
    this.filterShow = !this.filterShow;
  }

  rebuildReport() {
    this.buildReport();
  }
}
