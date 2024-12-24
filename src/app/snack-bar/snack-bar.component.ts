import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ACTION_ERROR } from '../config/constants';
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  standalone: false,
})
export class SnackBarComponent {
  data = inject(MAT_SNACK_BAR_DATA);

  actionError = ACTION_ERROR;
}
