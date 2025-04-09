import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ACTION, APP_MODES, ROUTES } from '../shared/contants';
import { ImagesFromServerService } from './images-from-server.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private imagesFromServerService = inject(ImagesFromServerService);

  private loggedIn = new BehaviorSubject<User | null>(null);
  // public readonly user: Observable<User | null> = EMPTY;
  public loggedIn$ = this.loggedIn.asObservable();
  //Used to changed body-background
  private unauthorized = new BehaviorSubject<boolean>(false);
  public unauthorized$ = this.unauthorized.asObservable();

  constructor() {
    if (this.auth) {
      authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          tap((u) => {
            console.log('Auth Service - User Details', u);
          })
        )
        .subscribe((isLoggedIn) => {
          this.loggedIn.next(isLoggedIn);
        });
    }
  }

  public async login() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      if (result.user) {
        this.router.navigate([ROUTES.GALLERY]);
      }
    } catch (error) {
      this.handleAuthErrors(error);
    }
  }

  public async logout(storageUnauthorized: boolean = false) {
    await signOut(this.auth);
    this.imagesFromServerService.resetGalleryState();
    this.imagesFromServerService.resetPlayground(
      ACTION.init,
      APP_MODES.gallery
    );
    //TODO: This method needs testing & improvements
    if (storageUnauthorized) {
      this.setUnauthorizedState(true);
      this.router.navigate([ROUTES.FALLBACK]);
    } else {
      this.setUnauthorizedState(false);
      this.router.navigate(['/']);
    }
    this.loggedIn.next(null);
  }

  public setUnauthorizedState(isUnauthorized: boolean) {
    this.unauthorized.next(isUnauthorized);
  }

  handleAuthErrors(error: any) {
    console.log(error.code);
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'auth/cancelled-popup-request':
        // File doesn't exist
        console.log(error.code);
        break;
      case 'auth/popup-closed-by-user':
        console.log(error.code);
        break;
    }
  }
}
