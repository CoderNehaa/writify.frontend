import { apiEndpoints } from "@/constants/endpoints";
import apiInstance from "./instance";

export const signinService = async (
  payload: ISignInPayload
): Promise<
  IResponse<{ user: IUser; accessToken: string; refreshToken: string }>
> => {
  return await apiInstance.post(apiEndpoints.auth.login, payload);
};

export const signupService = async (
  payload: ISignUpPayload
): Promise<IResponse<IUser>> => {
  return await apiInstance.post(apiEndpoints.auth.signup, payload);
};

export const checkUsernameService = async (username: string) => {
  const res = await apiInstance.post(apiEndpoints.auth.checkUsername, {
    username,
  });
  return res.data.usernameAvailable;
};

export const verifyService = async (payload: IVerifyPayload):Promise<IResponse<IUser>> => {
  return await apiInstance.post(apiEndpoints.auth.verify, payload);
};
