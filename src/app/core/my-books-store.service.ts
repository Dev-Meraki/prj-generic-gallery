import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UPDATE_MY_BOOKS, HAS_A_COPY } from '../pureUtilityFunction/helpers';
import { ACTION_ON_BOOK, ACTION_ERROR } from '../config/constants';
import { SnackBarService } from './utility-service/snack-bar.service';
@Injectable({
  providedIn: 'root',
})
export class MyBooksStoreService {
  private myBooks = new BehaviorSubject<Array<any>>([]);
  $myBooks = this.myBooks.asObservable();

  constructor(private snackBarService: SnackBarService) {}

  setMyBooksState(book: any, action: string) {
    let currentState: Array<any> = this.getMyBooksState();
    switch (action) {
      case ACTION_ON_BOOK.BORROW:
        currentState.push(book);
        this.myBooks.next(currentState);
        //NOTIFY
        this.snackBarService.openSnackBar({
          title: book.title,
          msg: ACTION_ON_BOOK.BORROW_SNACKBAR_TEXT,
          action: ACTION_ERROR.SUCCESS,
        });
        break;
      case ACTION_ON_BOOK.RETURN:
        this.myBooks.next(UPDATE_MY_BOOKS(book, currentState));
        //NOTIFY
        this.snackBarService.openSnackBar({
          title: book.title,
          msg: ACTION_ON_BOOK.RETURN_SNACKBAR_TEXT,
          action: ACTION_ERROR.SUCCESS,
        });
        break;
    }
  }

  allowToBorrow(book: any, currentState: Array<any>): boolean {
    if (currentState.length >= 0 && currentState.length < 2) {
      if (!HAS_A_COPY(book, currentState)) {
        return true;
      } else {
        this.snackBarService.openSnackBar({
          title: book.title,
          msg: ACTION_ERROR.COPIES_ALLOWED,
          action: ACTION_ERROR.ERROR,
        });
        return false;
      }
    } else {
      this.snackBarService.openSnackBar({
        title: book.title,
        msg: ACTION_ERROR.MAX_LIMIT,
        action: ACTION_ERROR.ERROR,
      });
    }
    return false;
  }

  getMyBooksState() {
    return this.myBooks.getValue();
  }
}
