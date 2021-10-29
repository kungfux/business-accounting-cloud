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
  item: Title = new Title();
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleApi: TitleApiService,
    private userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    const titleId = parseInt(id);
    if (!titleId) {
      this.isLoading = false;
    } else {
      this.titleApi.getTitle(titleId).subscribe({
        next: (title) => {
          this.item = title;
          this.isLoading = false;
        },
      });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const title = new Title({
      id: this.item.id,
      name: this.item.name,
      rate: this.item.rate,
      enabled: this.item.enabled,
      companyId: this.userPreferences.companyId,
    });

    if (title.id === 0) {
      this.titleApi.addTitle(title).subscribe({
        next: () => {
          this.navigateToAllTitles();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.titleApi.updateTitle(title.id, title).subscribe({
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
    this.titleApi.deleteTitle(this.item.id).subscribe({
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
