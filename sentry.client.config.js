import * as Sentry from "@sentry/nextjs"

Sentry.init({
    dsn: "https://302e25c7365faa2dbd6d9f323d3eedc9@o4509168455450624.ingest.us.sentry.io/4509168463446016",
    integrations: [Sentry.browserTracingIntegration()],
    tracePropagationTargets: ["https://myproject.org", /^\/api/],
    });