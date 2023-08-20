// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  API_URL:'http://localhost:3000',
  SPORTS:{
    NFL:'nfl'
  },
  firebase: {
    apiKey: "AIzaSyC93IjrOhr1oc0UWwPTFvdOIpp3Zc9QQT8",
    authDomain: "https://devmeraki.com/__/auth/handler",
    projectId: "meraki-public",
    appId: "1:961243721322:web:f70512473dbf80b8746413",
    measurementId: "G-H47S7TRMQV"
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
