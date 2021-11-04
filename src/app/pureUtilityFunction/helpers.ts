import { ACTION_ON_BOOK } from '../config/constants';
export const UPDATE_BOOK_STOCK = (
  book: any,
  currentState: Array<any>,
  action?: string
): Array<any> => {
  return currentState.map((bookFromLib) => {
    if (bookFromLib.id === book.id) {
      return {
        ...bookFromLib,
        inStock:
          action === ACTION_ON_BOOK.BORROW
            ? bookFromLib.inStock - 1
            : action === ACTION_ON_BOOK.RETURN
            ? bookFromLib.inStock + 1
            : 0,
      };
    } else {
      return {
        ...bookFromLib,
      };
    }
  });
};

export const UPDATE_MY_BOOKS = (
  book: any,
  currentState: Array<any>
): Array<any> => {
  return currentState.filter((bookFromLib) => bookFromLib.id != book.id);
};

export const HAS_A_COPY = (book: any, currentState: Array<any>): boolean => {
  return currentState.some((borrowed) => borrowed.id === book.id);
};
