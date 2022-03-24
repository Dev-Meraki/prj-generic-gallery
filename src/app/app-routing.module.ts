import { NgModule } from '@angular/core';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { FallbackComponent } from './fallback/fallback.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SignInComponent } from './sign-in/sign-in.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToGallery = () => redirectLoggedInTo(['gallery']);
import { ROUTES } from './config/constants';

const routes: Routes = [
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
    path:'**',
    redirectTo: ROUTES.FALLBACK,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
