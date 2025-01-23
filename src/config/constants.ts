export const Constants = {
  apiUrl: 'https://api.flizpay.de',
  checkoutPageUrl: 'https://pay.flizpay.de',
  webAppUrl: 'https://app.flizpay.de',
  websiteUrl: 'https://flizpay.de',
  sentryDsnUrl: 'https://4d699c4de490906ad3aedddfbd1e805b@o4507078336053248.ingest.de.sentry.io/4507078339002448',
  yaxiUrl: process.env.YAXI_URL || 'https://routex.yaxi.tech',
  termsAndConditionsUrl: 'https://www.flizpay.de/terms-and-conditions',
  privacyPolicyUrl: 'https://www.flizpay.de/privacy-policy'
};

export const ConstantsStaging = {
  apiUrl: 'https://api-staging.flizpay.de',
  yaxiUrl: 'https://souvlaki.yaxi.tech'
};

export const VERSION = 'v0.5.0';

export const FEATURE_FLAGS = {
  advancedSearch: false
};

export const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyCJqZQFmQv4IqmotrshDVMWS8-MqM8mE30';
