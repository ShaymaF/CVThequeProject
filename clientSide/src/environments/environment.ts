// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
  firebase : {
    apiKey: "AIzaSyBQZR7TM60pzo8WrEkQ8-29SQDdk-SQGsw",
    authDomain: "cvthequepfe.firebaseapp.com",
    databaseURL: "https://cvthequepfe.firebaseio.com",
    projectId: "cvthequepfe",
    storageBucket: "cvthequepfe.appspot.com",
    messagingSenderId: "136162495564",
    appId: "1:136162495564:web:56c860d772c255677c78e9",
    measurementId: "G-2970RFMW04"
  }
    
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
