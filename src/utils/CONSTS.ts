export const ICON_XS = 15;
export const ICON_SM = 20;
export const ICON_MD = 24;
export const ICON_LG = 32;
export const ICON_XL = 40;
export const ICON_XXL = 45;

export const CHECKOUT_URL = 'https://pay.flizpay.de';

export const PROFILE_PICTURE_MIN_DIMENSION = 120;
export const PROFILE_PICTURE_ASPECT_RATIO = 1;
export const PROFILE_PICTURE_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const INTEGRATION_TYPES = ['Custom API', 'WooCommerce'] as const;
export const SALES_CHANNELS = ['online', 'inPerson'] as const;
export const BUSINESS_CATEGORIES = [
  'mobility',
  'sports',
  'home-garden',
  'pets',
  'fashion',
  'electronics',
  'entertainment',
  'tickets',
  'education',
  'food-drinks',
  'health-beauty',
  'sustainable',
  'other',
  'leisure',
] as const;
