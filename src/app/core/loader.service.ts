import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading.asObservable();
  constructor() {}

  getLoadingState() {
    return this.loading.getValue();
  }
  setLoadingState(state: boolean) {
    console.log('Loader',state)
    return this.loading.next(state);
  }
}
