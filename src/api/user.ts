import { apiEndpoints } from "@/constants/endpoints";
import apiInstance from "./instance";

export const userEditService = async (
  payload: FormData
): Promise<IResponse<IUser>> => {
  return await apiInstance.put(apiEndpoints.user.root, payload);
};

export const userDeleteService = async (
  id: string
): Promise<IResponse<null>> => {
  return await apiInstance.delete(apiEndpoints.user.root);
};

export const userProfileService = async (): Promise<IResponse<IUser>> => {
  return await apiInstance.get(apiEndpoints.user.me);
};
