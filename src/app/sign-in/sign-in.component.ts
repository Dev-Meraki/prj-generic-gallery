import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false,
})
export class SignInComponent {
  auth = inject(AuthService);
}
