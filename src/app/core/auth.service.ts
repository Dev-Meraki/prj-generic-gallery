import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { ROUTES } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<User | null>(null);
  // public readonly user: Observable<User | null> = EMPTY;
  public loggedIn$ = this.loggedIn.asObservable();
  //Used to changed body-background
  private unauthorized = new BehaviorSubject<boolean>(false);
  public unauthorized$ = this.unauthorized.asObservable();

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private loader: LoaderService
  ) {
    if (auth) {
      // this.user = authState(this.auth);
      authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          tap((u) => console.log('Auth Service - User Details', u))
        )
        .subscribe((isLoggedIn) => {
          this.loggedIn.next(isLoggedIn);
        });
    }
  }

  public async login() {
    this.loader.setLoadingState(true);
    try {
      await signInWithRedirect(this.auth, new GoogleAuthProvider());
      // TODO: Check this piece of code
      // const user:any = await getRedirectResult(this.auth);
      // if (user.user.uid && user.user.uid != null) {
      //   this.router.navigate([ROUTES.GALLERY]);
      //   this.loader.setLoadingState(false);
      // }
    } catch (error) {
      this.handleAuthErrors(error);
    }
  }

  public async logout(storageUnauthorized: boolean = false) {
    await signOut(this.auth);
    if (storageUnauthorized) {
      this.setUnauthorizedState(true);
      this.router.navigate([ROUTES.FALLBACK]);
    } else {
      this.setUnauthorizedState(false);
      this.router.navigate(['/']);
    }
    this.setAuthState();
  }

  public setAuthState() {
    //Clear state
    this.loggedIn.next(null);
  }

  public setUnauthorizedState(isUnauthorized: boolean) {
    this.unauthorized.next(isUnauthorized);
  }

  handleAuthErrors(error: any) {
    this.loader.setLoadingState(false);
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
