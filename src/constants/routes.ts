/**
 * An array of routes that are public
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are only for logged out users
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * Prefix for API authetication routes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect for logged in users
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
