import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { Title } from 'src/app/services/api/models/title';
import { TitleApiService } from 'src/app/services/api/title.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['../../detailsPage.css'],
})
export class TitleComponent implements OnInit {
  title: Title = new Title();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private titleApi: TitleApiService
  ) {}

  ngOnInit(): void {
    const titleId: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (!titleId) {
      this.isLoading = false;
    } else {
      this.titleApi.getTitle(titleId).subscribe({
        next: (title) => {
          this.title = title;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const title = new Title({
      id: this.title.id,
      name: this.title.name,
      rate: this.title.rate,
      enabled: this.title.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (!title.id) {
      this.titleApi.addTitle(title).subscribe({
        next: () => {
          this.navigateToAllTitles();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.titleApi.updateTitle(title.id!, title).subscribe({
        next: () => {
          this.navigateToAllTitles();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.titleApi.deleteTitle(this.title.id!).subscribe({
      next: () => {
        this.navigateToAllTitles();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private navigateToAllTitles(): void {
    this.router.navigate(['/titles']);
  }
}
