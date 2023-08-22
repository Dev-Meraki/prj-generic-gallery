import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithRedirect,
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
    // const result = getRedirectResult(this.auth).then((result:any)=>console.log(result?.user));
    this.loader.setLoadingState(true);
    if (auth) {
      authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          tap((u) => {
            console.log('Auth Service - User Details', u);
          })
        )
        .subscribe((isLoggedIn) => {
          this.loggedIn.next(isLoggedIn);
          this.loader.setLoadingState(false);
        });
    }
  }

  public async login() {
    try {
      await signInWithRedirect(this.auth, new GoogleAuthProvider());
    } catch (error) {
      this.handleAuthErrors(error);
      this.loader.setLoadingState(false);
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
