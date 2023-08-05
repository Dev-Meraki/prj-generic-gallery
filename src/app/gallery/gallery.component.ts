import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { ImagesFromServerService } from '../core/images-from-server.service';
import { FormBuilder, Validators } from '@angular/forms';
import confetti from 'canvas-confetti';
import { Modes } from '../shared/interfaces';
import { ACTION, APP_MODES } from '../shared/contants';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  private userDisposable: Subscription | undefined;
  shake =false;
  play=false;
  //Two modes are available default: Gallery & Play
  MODE: Modes | string = this.play ? APP_MODES.play: APP_MODES.gallery;
  // onScreenPlayer:any = {};
  guessForm = this.fb.group({
    name: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    @Optional() public auth: AuthService, public imagesFromServer: ImagesFromServerService
  ) { }
  ngOnInit(): void {
    this.setAppMode(false);

    this.userDisposable = this.auth.loggedIn$
      .pipe(tap((e) => console.log('Gallery Comp - User is logged in', e)))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.imagesFromServer.getImages(ACTION.init, this.MODE);
        }
      }
      );
  }

  setAppMode(play:boolean){
    this.imagesFromServer.resetGalleryState();
    this.MODE = play ? APP_MODES.play: APP_MODES.gallery;
    this.imagesFromServer.getImages(ACTION.init, this.MODE);
  }

  doPagination() {
    console.log('scrolled');
    this.imagesFromServer.getImages(ACTION.paginate, this.MODE);
    // this.guessForm.reset();
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
      // this.storage.resetGalleryState();
    }
  }
  onSubmit(data: any) {
    if (this.guessForm.valid) {
      this.imagesFromServer.getResult(this.guessForm.value.name, data.results[0]?._id).subscribe((result: boolean) => {
        //Pop Confetti & move next
        if (result) {
          confetti();
          //Move to next image
          this.doPagination();
          this.guessForm.reset();
        }else{
          // Shake Card on incorrect
          this.shake = true;
          this.guessForm.reset();
          setTimeout(()=>{
            this.shake = false;
          },2000)
        }
      })
    }
  }
}


