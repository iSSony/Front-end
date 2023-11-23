// Imports
import { authKey } from "@/constants/storageKey";
import { IUserDecodedTokenData } from "@/types";
import { decodedToken } from "@/utils/jwt";
import { LocalStorageUtils } from "@/utils/local-storage";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/env.config";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return LocalStorageUtils.set(authKey, accessToken);
};

export const getUserInfo = (): IUserDecodedTokenData | string => {
  const authToken = LocalStorageUtils.get(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = LocalStorageUtils.get(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return LocalStorageUtils.del(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
