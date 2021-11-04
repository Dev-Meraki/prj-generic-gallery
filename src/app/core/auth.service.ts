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
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { map, startWith, take, takeLast, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(@Optional() private auth: Auth, private router: Router) {
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
    const user = await signInWithPopup(this.auth, new GoogleAuthProvider());
    if (user.user.uid && user.user.uid != null) {
      this.router.navigate(['/gallery']);
      //this.setUnauthorizedState(false);
    }
  }

  public async logout(storageUnauthorized: boolean = false) {
    await signOut(this.auth);
    if(storageUnauthorized){
      this.setUnauthorizedState(true);
      this.router.navigate(['/try-again'])
    }else{
      this.setUnauthorizedState(false);
      this.router.navigate(['/']);
    }
    this.setAuthState();
  }
  public setAuthState() {
    //Clear state
    this.loggedIn.next(null);
  }

  public setUnauthorizedState(isUnauthorized:boolean){
    this.unauthorized.next(isUnauthorized);
  }
}
