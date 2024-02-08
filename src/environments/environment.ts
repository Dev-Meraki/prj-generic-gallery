// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  API_URL:'https://api.devmeraki.com',
  SPORTS:{
    NFL:'nfl'
  },
  firebase: {
    apiKey: "AIzaSyBDkJ4lQTYgaBQ5v17kvUCsiFeXUq7gSp0",
    authDomain: "prj-meraki-gallery.firebaseapp.com",
    projectId: "prj-meraki-gallery",
    storageBucket: "prj-meraki-gallery.appspot.com",
    messagingSenderId: "898496080592",
    appId: "1:898496080592:web:3d86ce11d2efca03638cd5"
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
