import {
  Component,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // private userDisposable: Subscription | undefined;
  constructor(
    // private renderer: Renderer2,
    // @Optional() private auth: AuthService
  ) {}
  // ngOnInit(): void {
    // this.userDisposable = this.auth.unauthorized$.subscribe((unauthorized) => {
    //   // Unused code for now - DO NOT DELETE
    //   if (unauthorized) {
    //     this.renderer.removeClass(document.body, 'body-background');
    //   } else {
    //     this.renderer.addClass(document.body, 'body-background');
    //   }
    // });
  // }
  // ngOnDestroy(): void {
  //   if (this.userDisposable) {
  //     this.userDisposable.unsubscribe();
  //   }
  // }
}
