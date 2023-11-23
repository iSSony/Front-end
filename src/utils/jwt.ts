import { IUserDecodedTokenData } from "@/types";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string): IUserDecodedTokenData => {
  return jwtDecode(token);
};
