import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandsetService } from 'src/app/services/handset.service';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Input() isLoading: boolean = true;
  @Input() selectedItem: any | null = null;
  @Input() title: string = '';
  @Input() mode: ToolBarMode = ToolBarMode.None;
  @Input() customButton?: CustomButton;
  @Input() customEnabled: boolean = true;
  @Input() customTooltip?: string;
  @Input() saveEnabled: boolean = true;
  @Input() deleteVisible: boolean = true;
  @Input() deleteEnabled: boolean = true;
  @Input() favoriteVisible: boolean = false;
  @Input() favoriteEnabled: boolean = false;
  @Input() changePasswordVisible: boolean = false;
  @Input() changePasswordEnabled: boolean = true;
  @Input() filterVisible: boolean = false;
  @Output() createRequest = new EventEmitter();
  @Output() editRequest = new EventEmitter();
  @Output() saveRequest = new EventEmitter();
  @Output() deleteRequest = new EventEmitter();
  @Output() customRequest = new EventEmitter();
  @Output() favoriteRequest = new EventEmitter();
  @Output() filterRequest = new EventEmitter();
  @Output() changePasswordRequest = new EventEmitter();

  isHandset = this.handset.isHandset;

  constructor(
    private location: Location,
    private dialog: DialogComponent,
    private handset: HandsetService
  ) {}

  goBack(): void {
    this.location.back();
  }

  onCreateClick() {
    this.createRequest.emit();
  }

  onEditClick() {
    this.editRequest.emit();
  }

  onDeleteClick() {
    this.dialog.confirmDelete().subscribe((result) => {
      if (result) {
        this.deleteRequest.emit();
      }
    });
  }

  onSaveClick() {
    this.saveRequest.emit();
  }

  onSetFavoriteClick() {
    this.favoriteRequest.emit();
  }

  onFilterClick() {
    this.filterRequest.emit();
  }

  onChangePasswordClick() {
    this.changePasswordRequest.emit();
  }

  onCustomClick() {
    this.customRequest.emit();
  }
}

export enum ToolBarMode {
  None = 0,
  List = 1,
  Details = 2,
}

export class CustomButton {
  text: string = '';
  icon: string = '';

  constructor(text: string, icon: string) {
    this.text = text;
    this.icon = icon;
  }
}
