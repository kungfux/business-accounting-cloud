import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { Title } from 'src/app/services/api/models/title';
import { TitleApiService } from 'src/app/services/api/title.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['../../listPage.css'],
})
export class TitlesComponent implements OnInit {
  data: Title[] = [];
  selectedItem?: Title;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  constructor(
    private titleApi: TitleApiService,
    private router: Router,
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    this.getTitles();
  }

  getTitles(offset: number = 0): void {
    this.isLoading = true;
    this.titleApi
      .getTitles(this.userPreferences.companyId!, false, offset)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
        },
      });
  }

  selectItem(item: Title) {
    if (this.selectedItem != item) {
      this.selectedItem = item;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/titles/new']);
  }

  onEditRequest() {
    this.router.navigate(['/titles', this.selectedItem?.id]);
  }
}
