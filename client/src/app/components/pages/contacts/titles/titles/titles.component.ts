import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { Title } from 'src/app/services/api/models/title';
import { TitleApiService } from 'src/app/services/api/title.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['../../../listPage.css'],
})
export class TitlesComponent implements OnInit {
  data: Title[] = [];
  selectedItem?: Title;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;
  pageIndex: number = 1;

  constructor(
    private titleApi: TitleApiService,
    private router: Router,
    private userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(pageIndex: number = this.pageIndex): void {
    this.isLoading = true;
    this.titleApi
      .getTitles(this.userPreferences.companyId, (pageIndex - 1) * 10)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
          this.pageIndex = pageIndex;
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
