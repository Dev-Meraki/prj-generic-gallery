import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class AppComponent {
  // private userDisposable: Subscription | undefined;
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
