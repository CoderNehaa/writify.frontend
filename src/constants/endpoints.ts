export const apiEndpoints = {
  auth: {
    login: "auth/login",
    signup: "auth/signup",
    checkUsername: "auth/check-username",
    verify: "auth/verify-account",
  },
  user: {
    root: "user/",
    me: "user/me",
    id: (userId: string) => `user/${userId}`,
  },
};
