import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardImage,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LoaderComponent } from '../loader/loader.component';
import { ImagesFromServerService } from '../core/images-from-server.service';
import { LoaderService } from '../core/loader.service';
import { APP_MODES, ACTION } from '../shared/contants';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrl: './game-mode.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NgClass,
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    NgOptimizedImage,
    MatCardImage,
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatCardActions,
    MatButton,
    LoaderComponent,
  ],
})
export class GameModeComponent {
  private fb = inject(FormBuilder);
  loaderService = inject(LoaderService);
  loading = this.loaderService.loadingSignal;
  imagesFromServer = inject(ImagesFromServerService);

  shake = false;
  guessForm = this.fb.group({
    name: ['', Validators.required],
  });
  // comment below for resource demo
  images = this.imagesFromServer.imagesSignal;

  getImageUrl(item: any) {
    return `${item?.thumbnail.path}/portrait_uncanny.${item?.thumbnail.extension}`;
  }

  doPagination() {
    this.imagesFromServer.setGameIsInPlay(true);
    this.loaderService.setLoaderTo(true);
    this.imagesFromServer.setParams(ACTION.paginate, APP_MODES.play);
    // Comment below for resource demo
    this.imagesFromServer.getImages();
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
