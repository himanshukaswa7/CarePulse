// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://302e25c7365faa2dbd6d9f323d3eedc9@o4509168455450624.ingest.us.sentry.io/4509168463446016",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0,


  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
