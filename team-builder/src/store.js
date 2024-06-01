import { configureStore } from "@reduxjs/toolkit";
import members from "./membersSlice.js";

const store = configureStore({
  reducer: {
    members,
  },
});

export default store;
