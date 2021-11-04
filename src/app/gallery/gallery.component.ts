import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { StorageService } from '../core/storage.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  private userDisposable: Subscription | undefined;
  constructor(
    @Optional() public auth: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.userDisposable = this.auth.loggedIn$
      .pipe(tap((e) => console.log('Gallery Comp - User is logged in', e)))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.storage.getImages();
        }
      });
  }
  
  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
}
