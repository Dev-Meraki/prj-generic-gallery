import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule
    
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ],
})
export class MaterialModule {}
