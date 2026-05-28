import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../../entities/card/model/cardsSlice";
import userReducer from "../../entities/users/model/userSlice";
import { baseApi } from "../../shared/api/api";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) => {
   return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
