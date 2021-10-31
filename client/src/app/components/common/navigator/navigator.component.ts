import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  page: number = 1;
  limit: number = 10;

  @Input() isLoading: boolean = true;
  @Input() itemsCount: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private userPreferences: UserPreferencesService) {
    this.limit = userPreferences.limit;
  }

  ngOnInit(): void {}

  onPageChanged(nextPage: number) {
    this.page = nextPage;
    const offset = (this.page - 1) * this.limit;
    this.pageChanged.emit(offset);
  }
}
