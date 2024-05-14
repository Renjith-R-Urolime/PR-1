// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  local: false,
  live: true,
  enableCaching: false,
  appVersion: require('../../package.json').version,
  apiUrl:"https://api.development.infithra.com",
  appUrl: 'app.development.infithra.com',
  s3Bucket: 'infithra-non-prod-client-assets',
  s3Region: 'us-east-1',
  cognitoUserPoolId: 'us-east-1_B0evpPXDl',
  cognitoAppClientId: '68cf37qtu8rusjha7ot8f20q3m',
  cognitoIdentityPoolId: "us-east-1:a7f7d356-07a5-4888-aa7f-f3415c955816",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
