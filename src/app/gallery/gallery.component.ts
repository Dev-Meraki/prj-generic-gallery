import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { ImagesFromServerService } from '../core/images-from-server.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Modes } from '../shared/interfaces';
import { ACTION, APP_MODES } from '../shared/contants';
import { ChangeDetectionStrategy } from '@angular/core';
import { UserMenuComponent } from '../toolbar/user-menu/user-menu.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardTitle,
  MatCardImage,
} from '@angular/material/card';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoaderService } from '../core/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { GameModeComponent } from '../game-mode/game-mode.component';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserMenuComponent,
    MatSlideToggle,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    NgOptimizedImage,
    MatCardImage,
    ReactiveFormsModule,
    InfiniteScrollDirective,
    TitleCasePipe,
    LoaderComponent,
    GameModeComponent,
  ],
})
export class GalleryComponent implements OnDestroy {
  auth = inject(AuthService);
  imagesFromServer = inject(ImagesFromServerService);
  loaderService = inject(LoaderService);
  loading = this.loaderService.loadingSignal;

  private userDisposable: Subscription | undefined;

  enterPlayMode = false;
  //Two modes are available default: Gallery & Play
  MODE: Modes | string = this.enterPlayMode
    ? APP_MODES.play
    : APP_MODES.gallery;
  images = this.imagesFromServer.imagesSignal;
  gameIsInPlay = this.imagesFromServer.gameIsInPlaySignal;

  constructor() {
    this.userDisposable = this.auth.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // comment below for resource pattern to avoid redundant call
        this.imagesFromServer.getImages();
      }
    });
  }

  getImageUrl(item: any) {
    return `${item?.thumbnail.path}/portrait_uncanny.${item?.thumbnail.extension}`;
  }

  setAppMode(play: boolean) {
    this.loaderService.setLoaderTo(true);
    if (this.MODE === APP_MODES.play) {
      this.imagesFromServer.setGameIsInPlay(play);
    }
    this.imagesFromServer.resetGalleryState();
    this.MODE = play ? APP_MODES.play : APP_MODES.gallery;

    this.imagesFromServer.resetPlayground(ACTION.init, this.MODE);
    // comment below to showcase resource
    this.imagesFromServer.getImages();
  }

  doPagination() {
    this.loaderService.setLoaderTo(true);
    this.imagesFromServer.setParams(ACTION.paginate, this.MODE);
    // comment below to showcase resource pattern
    this.imagesFromServer.getImages();
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
}
