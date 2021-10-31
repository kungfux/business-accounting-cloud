import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  page: number = 1;

  @Input() isLoading: boolean = true;
  @Input() itemsCount: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onPageChanged(nextPage: number) {
    this.page = nextPage;
    const offset = (this.page - 1) * 10;
    this.pageChanged.emit(offset);
  }
}
