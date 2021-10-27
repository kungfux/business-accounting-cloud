import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertDialogComponent implements OnInit {
  @Input() title?: string;
  @Input() message?: string;

  constructor() {}

  ngOnInit(): void {}
}
