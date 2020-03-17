// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    clientId: 'ec540590bb6449a181edcbd27987aef6',
    redirectUrl: 'http://localhost:4200',
    scopes: 'user-top-read%20user-read-private%20playlist-read-private%20user-library-modify%20playlist-modify-public%20user-follow-read%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-read-currently-playing%20user-follow-modify%20playlist-modify-private%20playlist-read-collaborative%20user-library-read%20user-read-email',
    appRedirectUrl: 'https://accounts.spotify.com/authorize?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.