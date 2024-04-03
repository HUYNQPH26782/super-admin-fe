import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import MenuReducer from "./reducers/common/Menu/Menu.reducer";
import LoadingReducer from "./reducers/common/Loading/Loading.reducer";
import RolesReducer from "./reducers/systemManagement/Roles/Roles.reducer";
import ObjectsReducer from "./reducers/systemManagement/Objects/Objects.reducer";
import CodeMngReducer from "./reducers/common/CodeMng/CodeMng.reducer";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    codeMng: CodeMngReducer,
    loading: LoadingReducer,
    roles: RolesReducer,
    objects: ObjectsReducer
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
