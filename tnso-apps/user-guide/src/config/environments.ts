import { env } from 'env';

export const environment = {
  ...env,
  API_URL_STRAPI: env.VITE_API_URL_STRAPI,
};
