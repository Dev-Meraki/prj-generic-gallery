import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = signal(false);
  public loadingSignal = this.loading.asReadonly;

  setLoaderTo(value: boolean) {
    console.log('Loader', value);
    this.loading.update((currentLoadingState) => (currentLoadingState = value));
  }
}
