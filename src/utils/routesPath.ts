export const ROUTES_PATH = {
  AUTH: {
    LOGIN: "/auth",
    SIGNP: "/auth?mode=signup",
    VERIFY: (email: string = "") => `/auth/verify?email=${email}`,
  },
  ARTICLE: {
    ROOT: "/articles",
    WRITE: "/write",
    ID: (articleId: string = "") => ``,
  },
  CATEGORIES: "/categories",
  PROFILE: (userId: string = "") => `/profile/:userId`,
  SETTINGS: "/settings",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  MEMBERSHIP: "/membership",
};
