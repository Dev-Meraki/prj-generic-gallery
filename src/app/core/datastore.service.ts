import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { pluck } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UPDATE_BOOK_STOCK } from '../pureUtilityFunction/helpers';
@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  private booksFromLibrary = new BehaviorSubject<Array<any>>([]);
  $booksFromLibrary = this.booksFromLibrary.asObservable();

  constructor(private http: HttpClient) {
    // this.getBooksFromRemoteLibrary().subscribe(
    //   (booksFromRemoteLibrary: any) => {
    //     this.setLibraryState(booksFromRemoteLibrary);
    //   }
    // );
  }

  // `public getBooksFromRemoteLibrary() {
  //   return this.http.get(environment.API_URL).pipe(pluck('data', 'results'));
  // }`

  setLibraryState(book: any, action?: string) {
    let currentState: Array<any> = this.getLibraryState();
    if (!action) {
      return this.booksFromLibrary.next(book);
    }
    return this.booksFromLibrary.next(
      UPDATE_BOOK_STOCK(book, currentState, action)
    );
  }

  getLibraryState() {
    return this.booksFromLibrary.getValue();
  }
}
