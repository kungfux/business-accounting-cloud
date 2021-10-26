import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input() selectedItem: any = undefined;
  @Input() title: string = '';
  @Input() mode: ToolBarMode = ToolBarMode.List;
  @Input() customButton?: CustomButton;
  @Input() saveEnabled?: boolean = true;
  @Input() deleteEnabled?: boolean = true;
  @Input() customButtonEnabled?: boolean = true;
  @Input() deleteVisible: boolean = true;
  @Output() createRequest = new EventEmitter();
  @Output() editRequest = new EventEmitter();
  @Output() saveRequest = new EventEmitter();
  @Output() deleteRequest = new EventEmitter();
  @Output() customRequest = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private location: Location
  ) {}

  ngOnInit(): void {}

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
    this.deleteRequest.emit();
  }

  onSaveClick() {
    this.saveRequest.emit();
  }

  onCustomClick() {
    this.customRequest.emit();
  }
}

export enum ToolBarMode {
  List = 0,
  Details = 1,
}

export class CustomButton {
  text: string = '';
  icon: string = '';

  constructor(text: string, icon: string) {
    this.text = text;
    this.icon = icon;
  }
}
