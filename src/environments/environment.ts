// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:3000/ingestion',
  stateCode: "HP",
  numberFormat: {
    reports: {
      locale: 'en-IN',
      format: 'long'
    }
  },
  app_header_title: "भारत सरकार | Government of India",
  app_header_image_1: "Flag_of_India.svg",
  content_header_image_1: "MoE.png",
  content_header_image_2: "ncert_logo_vector_modified.png"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
