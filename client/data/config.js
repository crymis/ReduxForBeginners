import Raven from 'raven-js';

const sentry_key = '16bb07f97da04a4881648e5e94ee075b';
const sentry_app = '168291';
export const sentry_url = `https://${sentry_key}@app.getsentry.com/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
