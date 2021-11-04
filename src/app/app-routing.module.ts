import { NgModule } from '@angular/core';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { FallbackComponent } from './fallback/fallback.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SignInComponent } from './sign-in/sign-in.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToGallery = () => redirectLoggedInTo(['gallery']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'try-again',
    component: FallbackComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path:'**',
    redirectTo: 'try-again',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
