import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../feature/userDetailSlice";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
