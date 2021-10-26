import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  confirmDelete(): Observable<boolean> {
    const dialogRef = this.dialog.open(DeleteComponent);
    return dialogRef.afterClosed();
  }
}
