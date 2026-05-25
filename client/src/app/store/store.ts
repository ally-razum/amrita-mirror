import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../../entities/card/model/cardsSlice";
import userReducer from "../../entities/users/model/userSlice";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
