import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone: false,
})
export class UserMenuComponent {
  auth = inject(AuthService);
}
