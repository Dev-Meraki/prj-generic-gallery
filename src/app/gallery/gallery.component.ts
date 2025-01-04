import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { ImagesFromServerService } from '../core/images-from-server.service';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import confetti from 'canvas-confetti';
import { Modes } from '../shared/interfaces';
import { ACTION, APP_MODES } from '../shared/contants';
import { ChangeDetectionStrategy } from '@angular/core';
import { UserMenuComponent } from '../toolbar/user-menu/user-menu.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgClass, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardTitle,
  MatCardImage,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoaderService } from '../core/loader.service';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserMenuComponent,
    MatSlideToggle,
    FormsModule,
    NgClass,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    NgOptimizedImage,
    MatCardImage,
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButton,
    InfiniteScrollDirective,
    TitleCasePipe,
    LoaderComponent,
  ],
})
export class GalleryComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  auth = inject(AuthService);
  imagesFromServer = inject(ImagesFromServerService);
  loaderService = inject(LoaderService);
  loading = this.loaderService.loadingSignal;

  private userDisposable: Subscription | undefined;
  shake = false;
  enterPlayMode = false;
  //Two modes are available default: Gallery & Play
  MODE: Modes | string = this.enterPlayMode
    ? APP_MODES.play
    : APP_MODES.gallery;
  gameIsInPlay = false;
  guessForm = this.fb.group({
    name: ['', Validators.required],
  });
  images = this.imagesFromServer.imagesSignal;
  constructor() {
    this.userDisposable = this.auth.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.imagesFromServer.getImages(ACTION.init, this.MODE);
      }
    });
  }

  getImageUrl(item: any) {
    return `${item?.thumbnail.path}/portrait_uncanny.${item?.thumbnail.extension}`;
  }

  setAppMode(play: boolean) {
    this.imagesFromServer.resetGalleryState();
    if (!play) {
      this.gameIsInPlay = play;
    }
    this.MODE = play ? APP_MODES.play : APP_MODES.gallery;
    this.imagesFromServer.getImages(ACTION.init, this.MODE);
  }

  doPagination() {
    if (this.MODE !== 'GALLERY') {
      this.gameIsInPlay = true;
    }
    this.imagesFromServer.getImages(ACTION.paginate, this.MODE);
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  onSubmit() {
    if (this.guessForm.valid) {
      const result = this.imagesFromServer.getResult(
        this.guessForm.getRawValue().name?.toLowerCase()
      );
      //Pop Confetti & move next
      if (result) {
        confetti();
        //Move to next image
        this.doPagination();
        this.guessForm.reset();
      } else {
        // Shake Card on incorrect
        this.shake = true;
        this.guessForm.reset();
        setTimeout(() => {
          this.shake = false;
        }, 2000);
      }
    }
  }
}
