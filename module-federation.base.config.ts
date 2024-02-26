import { env } from './env';

export function shared(pkg: string) {
  // Don't share this package; each app can load its own version.
  if (pkg === '@tnso/ui-components' || pkg === '@tnso/roles-and-permissions')
    return false;
}

export const PORTAL_IP_HOST = env.VITE_PORTAL_IP_HOST;
export const PORTAL_IP_REMOTE = env.VITE_PORTAL_IP_REMOTE;
export const PORTAL_PORT_HOST = env.VITE_PORTAL_PORT_HOST;
export const PORTAL_PORT_REMOTE = env.VITE_PORTAL_PORT_REMOTE;
export const ADMINISTRATION_PORT_REMOTE = env.VITE_ADMINISTRATION_PORT_REMOTE;
export const I18N_PORT_REMOTE = env.VITE_I18N_PORT_REMOTE;

