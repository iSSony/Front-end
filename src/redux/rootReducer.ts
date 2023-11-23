// Imports
import { baseApi } from "./api/baseApi";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

// Root Reducer
export const reducer = {
  user: userReducer,
  cart: cartReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
