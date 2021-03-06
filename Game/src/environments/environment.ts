// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ws_url: 'http://172.24.99.9:8083',
  keyCodes: {right:39, left:37,up:38,down:40,shoot:32,applyPower:13},
  playerActions:{shoot:"shoot", move:"move",join:"joinGame",applyPower:"applyPower"},
  serverUpdateMessages:{updateMessage:"gameState"},
  directions:{left:0, up:1, right:2, down:3}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
