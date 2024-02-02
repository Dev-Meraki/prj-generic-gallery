import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SignInComponent } from './sign-in/sign-in.component';
import { AngularFireModule } from '@angular/fire/compat';
import { GalleryComponent } from './gallery/gallery.component';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';
import { FallbackComponent } from './fallback/fallback.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderComponent } from './loader/loader.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SignInComponent,
    GalleryComponent,
    UserMenuComponent,
    FallbackComponent,
    LoaderComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    NgxMasonryModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
