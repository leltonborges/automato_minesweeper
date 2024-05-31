import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
              providedIn: 'root'
            })
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  notify(msg: string) {
    this._snackBar.open(msg, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
