import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
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

  private images = signal<MarvelApiResponse>(INIT_GALLERY_STATE);
  imagesSignal = this.images.asReadonly();

  private getQueryParams(
    action: string,
    mode: Modes | string,
    currentPageState: number
  ) {
    if (action === ACTION.init && mode === APP_MODES.gallery) {
      return `limit=10&offset=0`;
    } else if (mode === APP_MODES.play) {
      return `limit=1&offset=${currentPageState + 1}`;
    } else {
      return `limit=10&offset=${(currentPageState + 1) * 10}`;
    }
  }

  public getImages(action: string, mode: Modes | string = APP_MODES.gallery) {
    this.loader.setLoaderTo(true);
    const currentPageState = this.getGalleryState().page;

    const queryParams = this.getQueryParams(action, mode, currentPageState);
    this.getImagesFromServer(queryParams).subscribe(
      (response: MarvelApiResponse) => {
        action === ACTION.paginate && mode === APP_MODES.gallery
          ? this.generateStatePostPagination(response, currentPageState)
          : this.images.set({
              ...response,
              page: currentPageState + 1,
            });
        this.loader.setLoaderTo(false);
      }
    );
  }

  public getGalleryState(): MarvelApiResponse {
    return this.imagesSignal();
  }

  resetGalleryState() {
    this.images.set({ ...INIT_GALLERY_STATE });
  }

  // TODO: Error Handling of http request
  private getImagesFromServer(queryParamStr: string) {
    // return this.http.get<any>(`${this.BASE_URL}/headshots?${queryParamStr}`);
    return this.http.get<MarvelApiResponse>(
      `${environment.API_URL}public/characters?${queryParamStr}&apikey=${environment.API_KEY}`
    );
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

  private generateStatePostPagination(
    response: MarvelApiResponse,
    currentPageState: number
  ) {
    this.images.set({
      ...response,
      page: currentPageState + 1, // Here, page is an additional field added.
      data: {
        ...response.data,
        results: [
          ...this.getGalleryState()?.data?.results,
          ...(response.data?.results as Character[]),
        ],
      },
    });
  }
}
