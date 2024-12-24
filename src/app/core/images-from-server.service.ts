import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modes } from '../shared/interfaces';
import { APP_MODES, ACTION } from '../shared/contants';

import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Injectable({
  providedIn: 'root',
})
export class ImagesFromServerService {
  private http = inject(HttpClient);
  private loader = inject(LoaderService);
  private BASE_URL = `${environment.API_URL}/${environment.SPORTS.NFL}`;
  readonly offset = 0;

  private INIT_GALLERY_STATE: any = {
    results: [],
    next: null,
    previous: null,
    count: 0,
  };

  private images = new BehaviorSubject<any>({
    results: [],
    next: undefined,
    previous: null,
    count: 0,
  });

  images$ = this.images.asObservable();

  private getQueryParamStr(action: string, mode: Modes | string) {
    if (action === ACTION.init && mode === APP_MODES.gallery) {
      return `limit=7&offset=0`;
    } else if (action === ACTION.init && mode === APP_MODES.play) {
      return `limit=1&offset=0`;
    } else {
      return this.getGalleryState().next;
    }
  }

  public getImages(action: string, mode: Modes | string = APP_MODES.gallery) {
    this.loader.setLoaderTo(true);
    const queryParamStr = this.getQueryParamStr(action, mode);

    this.getImagesFromServer(queryParamStr).subscribe((response: any) => {
      action === ACTION.paginate && mode === APP_MODES.gallery
        ? this.images.next({
            ...response,
            results: [...this.getGalleryState().results, ...response.results],
          })
        : this.images.next({
            ...response,
          });
      console.log('Updated state', this.images.getValue());
      this.loader.setLoaderTo(false);
    });
  }

  public getGalleryState() {
    console.log('Initial state', this.images.getValue());
    return this.images.getValue();
  }

  resetGalleryState() {
    this.images.next({ ...this.INIT_GALLERY_STATE });
  }

  // TODO: Error Handling of http request
  private getImagesFromServer(queryParamStr: string) {
    return this.http.get<any>(`${this.BASE_URL}/headshots?${queryParamStr}`);
  }

  getResult(name: any, id: string): Observable<boolean> {
    return this.http.get<any>(
      `${this.BASE_URL}/headshots/gameResult?name=${name}&id=${id}`
    );
  }
}
