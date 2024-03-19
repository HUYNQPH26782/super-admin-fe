import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ProductReducer from "./reducers/Product/Product.reducer";
import MenuReducer from "./reducers/Menu/Menu.reducer";
import LoadingReducer from "./reducers/Loading/Loading.reducer";
import RolesReducer from "./reducers/Roles/Roles.reducer";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    menu: MenuReducer,
    loading: LoadingReducer,
    roles: RolesReducer
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
