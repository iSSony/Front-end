// Imports
import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { setCart } from "@/redux/slices/cartSlice";
import { setClientSecret } from "@/redux/slices/userSlice";
import { NextRouter } from "next/router";
import { AppDispatch } from "@/redux/store";

export const logoutUser = (
  dispatch: AppDispatch,
  router: NextRouter,
  route?: string
) => {
  removeUserInfo(authKey);

  // Resetting all state values
  dispatch(setCurrentUser(null));
  dispatch(setCart(null));
  dispatch(setClientSecret(""));
  router.push(route || "/");
};
