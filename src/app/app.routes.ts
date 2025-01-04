import { Routes } from '@angular/router';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { FallbackComponent } from './fallback/fallback.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ROUTES } from './shared/contants';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToGallery = () => redirectLoggedInTo(['gallery']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.LOGIN,
    pathMatch: 'full',
  },
  {
    path: ROUTES.LOGIN,
    component: SignInComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path: ROUTES.GALLERY,
    component: GalleryComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: ROUTES.FALLBACK,
    component: FallbackComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToGallery },
  },
  {
    path: '**',
    redirectTo: ROUTES.FALLBACK,
    pathMatch: 'full',
  },
];
