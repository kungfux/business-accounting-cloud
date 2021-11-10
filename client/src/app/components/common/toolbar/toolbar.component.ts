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
  @Input() saveEnabled: boolean = true;
  @Input() deleteEnabled: boolean = true;
  @Input() favoriteEnabled: boolean = false;
  @Input() customEnabled: boolean = true;
  @Input() deleteVisible: boolean = true;
  @Input() favoriteVisible: boolean = false;
  @Output() createRequest = new EventEmitter();
  @Output() editRequest = new EventEmitter();
  @Output() saveRequest = new EventEmitter();
  @Output() deleteRequest = new EventEmitter();
  @Output() customRequest = new EventEmitter();
  @Output() favoriteRequest = new EventEmitter();

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
