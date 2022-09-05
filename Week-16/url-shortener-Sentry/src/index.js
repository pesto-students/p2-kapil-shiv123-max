import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

Sentry.init({
  dsn: "https://4686dafa587b4d0ab8d8c4ce7633b93e@o1388811.ingest.sentry.io/6718461",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));