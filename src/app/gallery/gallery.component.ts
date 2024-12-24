import { Component, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { ImagesFromServerService } from '../core/images-from-server.service';
import { FormBuilder, Validators } from '@angular/forms';
import confetti from 'canvas-confetti';
import { Modes } from '../shared/interfaces';
import { ACTION, APP_MODES } from '../shared/contants';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GalleryComponent implements OnDestroy {
  private userDisposable: Subscription | undefined;
  shake = false;
  play = false;
  //Two modes are available default: Gallery & Play
  MODE: Modes | string = this.play ? APP_MODES.play : APP_MODES.gallery;
  guessForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    @Optional() public auth: AuthService,
    public imagesFromServer: ImagesFromServerService
  ) {
    this.userDisposable = this.auth.loggedIn$
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.imagesFromServer.getImages(ACTION.init, this.MODE);
        }
      });
  }

  setAppMode(play: boolean) {
    this.imagesFromServer.resetGalleryState();
    this.MODE = play ? APP_MODES.play : APP_MODES.gallery;
    this.imagesFromServer.getImages(ACTION.init, this.MODE);
  }

  doPagination() {
    console.log('scrolled');
    this.imagesFromServer.getImages(ACTION.paginate, this.MODE);
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  onSubmit(data: any) {
    if (this.guessForm.valid) {
      this.imagesFromServer
        .getResult(this.guessForm.value.name, data.results[0]?._id)
        .subscribe((result: boolean) => {
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
        });
    }
  }
}
