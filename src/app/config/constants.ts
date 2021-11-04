const LIMIT = 2;
const DISTINCT = 1;

export const VIEWS = {
  LIBRARY: 'LIBRARY',
  MY_BOOKS: 'USER',
};

export const ACTION_ON_BOOK = {
  BORROW: 'add',
  BORROW_TOOLTIP_TEXT: 'Click To Borrow',
  BORROW_SNACKBAR_TEXT:'Added to your collection: ',
  RETURN: 'remove',
  RETURN_TOOLTIP_TEXT: 'Return Book',
  RETURN_SNACKBAR_TEXT:'Returned from your collection: ',
};

export const ACTION_ERROR = {
  ERROR:'ERROR',
  SUCCESS:'SUCCESS',
  MAX_LIMIT: `You can borrow only ${LIMIT} books`,
  COPIES_ALLOWED: `You can borrow only ${DISTINCT} copy of`,
};
