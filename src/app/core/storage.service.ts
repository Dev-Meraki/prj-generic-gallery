import { Injectable, Optional } from '@angular/core';
import {
  getStorage,
  ref,
  list,
  getDownloadURL,
  StorageReference,
  ListResult,
} from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { GALLERY, DIRECTORIES } from '../config/constants'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly MAX_RESULTS = 7;
  private INIT_GALLERY_STATE:GALLERY = {
    items: [],
    nextPageToken: undefined,
  }
  readonly storage = getStorage();

  private images = new BehaviorSubject<GALLERY>({
    items: [],
    nextPageToken: undefined,
  });
  images$ = this.images.asObservable();

  constructor(
    @Optional() public auth: AuthService,
    private loader: LoaderService
  ) {}

  public async getImages(album: string = DIRECTORIES.GOLU) {
    // Fetch the first page of 100.
    await this.getObjectList(album, {
      maxResults: this.MAX_RESULTS,
    });
  }

  private async generateDownloadURL(objects: Array<any>) {
    //TODO: Define object interface
    try {
      let getDownloadURLPromises: any = [];
      objects.forEach((e) =>
        getDownloadURLPromises.push(
          getDownloadURL(ref(this.storage, e.fullPath))
        )
      );
      const allPromise = Promise.all(getDownloadURLPromises);
      const URLS: any = await allPromise;

      const currentGalleryState = this.getGalleryState();
      this.images.next({
        ...currentGalleryState,
        items: [...currentGalleryState.items, ...URLS],
      });
      //DEBUG
      console.log(this.getGalleryState());
    } catch (error: any) {
      this.handleStorageErrors(error);
    }
  }

  private async getObjectList(album: string, config: {}) {
    // Create a reference under which you want to list
    try {
      this.loader.setLoadingState(true);
      const listRef: StorageReference = ref(this.storage, album);
      const objects: ListResult = await list(listRef, config);

      if (objects.items && objects.items.length > 0) {
        const currentGalleryState = this.getGalleryState();
        this.images.next({
          ...currentGalleryState,
          nextPageToken: objects.nextPageToken,
        });
        await this.generateDownloadURL(objects.items);
      }
      this.loader.setLoadingState(false);
    } catch (error) {
      this.handleStorageErrors(error);
    }
  }

  // On Scroll - Fetch the next page if there are more elements.
  public async getNextSetOfObjects(album: string) {
    //Check the value on BS if it has next page token if yes then execute below & album
    if (this.getGalleryState().nextPageToken != undefined) {
      return await this.getObjectList(album, {
        maxResults: this.MAX_RESULTS,
        pageToken: this.getGalleryState().nextPageToken,
      });
    }
  }

  getGalleryState() {
    return this.images.getValue();
  }

  resetGalleryState(){
    this.images.next({...this.INIT_GALLERY_STATE})
  }

  handleStorageErrors(error: any) {
    this.loader.setLoadingState(false);
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        console.log('storage/object-not-found');
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.log('storage/unauthorized');
        // This account is not permitted from BE Rules
        this.auth.logout(true);
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.log('storage/unknown');
        break;
    }
  }
}
