export const DIRECTORIES = {
  GOLU: '/Golu'
};
export interface GALLERY {
  items: Array<string>;
  nextPageToken: string | undefined;
}

export const ACTION_ERROR = {
  ERROR:'ERROR',
  SUCCESS:'SUCCESS',
  MAX_LIMIT: `You can borrow only $LIMIT books`,
  COPIES_ALLOWED: `You can borrow only $DISTINCT copy of`,
};