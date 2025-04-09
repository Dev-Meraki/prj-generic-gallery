// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  API_URL: 'https://gateway.marvel.com/v1/',
  API_KEY: 'ENTER_YOUR_MARVEL_API_KEY',
  SPORTS: {
    NFL: 'nfl',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyDfqvFjbR9oxrU0uubgldYxy3pTgzZWurw',
    authDomain: 'prj-meraki-nfl-fan-club.firebaseapp.com',
    projectId: 'prj-meraki-nfl-fan-club',
    appId: '1:364812909834:web:e703753de8c97fb03c4ef3',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
