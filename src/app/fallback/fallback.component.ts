import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-fallback',
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.scss'],
  standalone: false,
})
export class FallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.auth.setUnauthorizedState(true);
  }
  redirectToLogin = () => {
    this.auth.setUnauthorizedState(false);
    this.router.navigate(['/']);
  };
}
