import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css', '../widget-spinner.css'],
})
export class WidgetComponent implements OnInit {
  @Input() icon?: string;
  @Input() title?: string;
  @Input() content?: string;
  @Input() note?: string;
  @Input() help?: string;
  @Input() color?: string;
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
