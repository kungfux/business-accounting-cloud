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
  @Input() saveEnabled?: boolean = true;
  @Input() deleteVisible: boolean = true;
  @Output() createRequest = new EventEmitter();
  @Output() editRequest = new EventEmitter();
  @Output() saveRequest = new EventEmitter();
  @Output() deleteRequest = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

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
}

export enum ToolBarMode {
  List = 0,
  Details = 1,
}
