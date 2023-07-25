import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(_data: any) {
    this._snackBar.openFromComponent(SnackBarComponent, {data:_data});
  }
}
