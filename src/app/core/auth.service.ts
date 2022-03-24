import { Injectable, Optional } from '@angular/core';
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
import { LoaderService } from './loader.service';

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
      const user = await signInWithPopup(this.auth, new GoogleAuthProvider());
      if (user.user.uid && user.user.uid != null) {
        this.router.navigate(['/gallery']);
        this.loader.setLoadingState(false);
      }
    } catch (error) {
      this.handleAuthErrors(error);
    }
  }

  public async logout(storageUnauthorized: boolean = false) {
    await signOut(this.auth);
    if (storageUnauthorized) {
      this.setUnauthorizedState(true);
      this.router.navigate(['/try-again']);
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
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.log('storage/unauthorized');
        // This account is not permitted from BE Rules
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.log('storage/unknown');
        break;
    }
  }
}
