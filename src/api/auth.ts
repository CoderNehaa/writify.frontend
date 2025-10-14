import { apiEndpoints } from "@/constants/endpoints";
import apiInstance from "./instance";

export const signinService = async (payload: ISignInPayload) => {
  return await apiInstance.post(apiEndpoints.login, payload);
};

export const signupService = async (payload: ISignUpPayload) => {
  return await apiInstance.post(apiEndpoints.signup, payload);
};

export const checkUsernameService = async (username: string) => {
  const res = await apiInstance.post(apiEndpoints.checkUsername, { username });
  return res.data.usernameAvailable;
};
