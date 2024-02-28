import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/Product/Product.reducer";
import MenuReducer from "./reducers/Menu/Menu.reducer";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    menu: MenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
