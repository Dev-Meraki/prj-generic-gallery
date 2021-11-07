// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    projectId: 'golu-life',
    appId: '1:179048005477:web:b118660b6f1a2eb94b6b8c',
    storageBucket: 'golu-life.appspot.com',
    locationId: 'asia-south1',
    apiKey: 'AIzaSyCcECzFpsA29TxjPky3RNUerdM113AVZb4',
    authDomain: 'golu-life.firebaseapp.com',
    messagingSenderId: '179048005477',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
