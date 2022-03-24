export const DIRECTORIES = {
  GOLU: '/Golu'
};
export interface GALLERY {
  items: Array<string>;
  nextPageToken: string | undefined;
}

export const ACTION_ERROR = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  MAX_LIMIT: `You can borrow only $LIMIT books`,
  COPIES_ALLOWED: `You can borrow only $DISTINCT copy of`,
};

export const ALLOWED_IMAGE_FORMAT = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml'
];
export const ROUTES ={
  GALLERY: 'gallery',
  FALLBACK: 'try-again',
  LOGIN: 'login'
}
