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
  titles: Title[] = [];
  selectedTitle?: Title;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  constructor(
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService,
    private titleApi: TitleApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTitles();
  }

  getTitles(offset: number = 0): void {
    this.isLoading = true;
    this.titleApi.getTitles(this.userPreferences.companyId!, offset).subscribe({
      next: (titles) => {
        this.titles = titles;
        this.isLoading = false;
      },
    });
  }

  selectTitle(title: Title) {
    if (this.selectedTitle != title) {
      this.selectedTitle = title;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/titles/new']);
  }

  onEditRequest() {
    this.router.navigate(['/titles', this.selectedTitle?.id]);
  }
}
