import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { MarvelApiResponse, Modes, Character } from '../shared/interfaces';
import { APP_MODES, ACTION, INIT_GALLERY_STATE } from '../shared/contants';

import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ImagesFromServerService {
  private http = inject(HttpClient);
  private loader = inject(LoaderService);
  private gameIsInPlay = signal<boolean>(false);
  gameIsInPlaySignal = this.gameIsInPlay.asReadonly();

  private images = signal<MarvelApiResponse>(INIT_GALLERY_STATE);
  imagesSignal = this.images.asReadonly();

  private action = signal(ACTION.init);
  private mode = signal(APP_MODES.gallery);
  private currentPage = signal(0);

  private queryParamStr: any = computed(() => {
    if (this.action() === ACTION.init && this.mode() === APP_MODES.gallery) {
      return `limit=10&offset=${this.currentPage()}`;
    } else if (this.mode() === APP_MODES.play) {
      return `limit=1&offset=${this.currentPage() + 1}`;
    } else {
      return `limit=10&offset=${this.currentPage() * 10}`;
    }
  });

  // Uncomment for resource demo-II
  // public imageResource = this.getImages();

  // Uncomment for resource demo-I
  getImagesResource = httpResource<MarvelApiResponse>(
    () =>
      `${environment.API_URL}public/characters?${this.queryParamStr()}&apikey=${
        environment.API_KEY
      }`,
    {
      defaultValue: INIT_GALLERY_STATE,
      parse: (rawResponse: any) => {
        this.loader.setLoaderTo(false);
        if (
          this.action() === ACTION.paginate &&
          this.mode() === APP_MODES.gallery
        ) {
          this.generateStatePostPagination(rawResponse);
        } else {
          this.images.set({
            ...rawResponse,
          });
          return {
            ...rawResponse,
          };
        }
      },
    }
  );

  setParams(action: string, mode: Modes | string) {
    this.currentPage.update((value) => {
      console.log('I RAN');
      return value + 1;
    });
    this.action.update(() => action);
    this.mode.update(() => mode);
  }

  resetPlayground(action: string, mode: string) {
    this.currentPage.update(() => 0);
    this.action.update(() => action);
    this.mode.update(() => mode);
  }

  public getImages() {
    this.getImagesFromServer().subscribe((response: MarvelApiResponse) => {
      this.action() === ACTION.paginate && this.mode() === APP_MODES.gallery
        ? this.generateStatePostPagination(response)
        : this.images.set({
            ...response,
          });
      this.loader.setLoaderTo(false);
    });
  }

  public getGalleryState(): any {
    return this.imagesSignal();
  }

  resetGalleryState() {
    this.images.set({ ...INIT_GALLERY_STATE });
  }

  private getImagesFromServer() {
    this.loader.setLoaderTo(true);
    return this.http.get<MarvelApiResponse>(
      `${environment.API_URL}public/characters?${this.queryParamStr()}&apikey=${
        environment.API_KEY
      }`
    );
    // return httpResource<MarvelApiResponse>(
    //   () =>
    //     `${
    //       environment.API_URL
    //     }public/characters?${this.queryParamStr()}&apikey=${
    //       environment.API_KEY
    //     }`,
    //   {
    //     defaultValue: INIT_GALLERY_STATE,
    //     parse: (rawResponse: any) => {
    //       this.loader.setLoaderTo(false);
    //       if (
    //         this.action() === ACTION.paginate &&
    //         this.mode() === APP_MODES.gallery
    //       ) {
    //         this.generateStatePostPagination(rawResponse);
    //       } else {
    //         this.images.set({
    //           ...rawResponse,
    //         });
    //         return {
    //           ...rawResponse,
    //         };
    //       }
    //     },
    //   }
    // );
  }

  getResult(name: string | undefined): boolean {
    // return this.http.get<any>(
    //   `${this.BASE_URL}/headshots/gameResult?name=${name}&id=${id}`
    // );
    if (!name) return false;
    const characterName =
      this.getGalleryState()?.data?.results[0].name.toLowerCase();
    return name === characterName;
  }

  private generateStatePostPagination(response: MarvelApiResponse) {
    this.images.set({
      ...response,
      data: {
        ...response.data,
        results: [
          ...this.getGalleryState()?.data?.results,
          ...(response.data?.results as Character[]),
        ],
      },
    });
  }

  setGameIsInPlay(inPlay: boolean) {
    this.gameIsInPlay.update(() => inPlay);
  }
}
