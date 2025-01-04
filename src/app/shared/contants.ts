import { MarvelApiResponse } from './interfaces';

export const APP_MODES = {
  gallery: 'GALLERY',
  play: 'PLAY',
  inplay: 'INPLAY',
};

export const ACTION = {
  init: 'INIT',
  paginate: 'PAGINATE',
};

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
  'image/svg+xml',
];
export const ROUTES = {
  GALLERY: 'gallery',
  FALLBACK: 'try-again',
  LOGIN: 'login',
};

export const INIT_GALLERY_STATE: MarvelApiResponse = {
  code: 200, // The HTTP status code of the returned result.
  status: 'OK', // A string description of the call status.
  copyright: '© 2025 MARVEL', // The copyright notice for the returned result.
  attributionText: 'Data provided by Marvel. © 2025 MARVEL', // The attribution notice for this result.
  // Please display either this notice or the contents of the attributionHTML field
  // on all screens which contain data from the Marvel Comics API.
  attributionHTML: `<a href="http://marvel.com">Data provided by Marvel. © 2025 MARVEL</a>`, // An HTML representation of the attribution notice for this result.
  // Please display either this notice or the contents of the attributionText field
  // on all screens which contain data from the Marvel Comics API.
  data: {
    offset: 0, // The requested offset (number of skipped results) of the call.
    limit: 10, // The requested result limit.
    total: 10, // The total number of resources available given the current filter set.
    count: 1, // The total number of results returned by this call.
    results: [],
  }, // The results returned by the call.
  etag: 'string', // A digest value of the content returned by the call.
  page: 0,
};
