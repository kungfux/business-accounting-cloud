import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertDialogComponent } from '../alert/alert.component';
import { DeleteDialogComponent } from '../delete/delete.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  confirmDelete(): Observable<boolean> {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      autoFocus: false,
    });
    return dialogRef.afterClosed();
  }

  showAlert(title: string, message: string): Observable<boolean> {
    const data = { title: title, message: message };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: data,
    });
    return dialogRef.afterClosed();
  }
}
