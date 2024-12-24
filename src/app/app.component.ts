import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
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
