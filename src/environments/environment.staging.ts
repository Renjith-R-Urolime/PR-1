// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  local: false,
  live: true,
  enableCaching: false,
  appVersion: require('../../package.json').version,
  apiUrl:"https://api.staging.infithra.com",
  appUrl: 'app.staging.infithra.com',
  s3Bucket: 'infithra-non-prod-client-assets',
  s3Region: 'us-east-1',
  cognitoUserPoolId: 'us-east-1_QQBXg3f2l',
  cognitoAppClientId: '2qpj2s3vv3jninl7hoql5nf5du',
  cognitoIdentityPoolId: "us-east-1:d8851c29-b367-4bd8-96e6-ec939873956d",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
