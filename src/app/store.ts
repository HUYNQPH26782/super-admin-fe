import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import MenuReducer from "./reducers/common/Menu/Menu.reducer";
import LoadingReducer from "./reducers/common/Loading/Loading.reducer";
import RolesReducer from "./reducers/systemManagement/Roles/Roles.reducer";
import ObjectsReducer from "./reducers/systemManagement/Objects/Objects.reducer";
import CodeMngReducer from "./reducers/common/CodeMng/CodeMng.reducer";
import MenuParentReducer from "./reducers/systemManagement/Objects/MenuParent.reducer";
import PreimiumReducer from "./reducers/informationManagement/Premium/Preimium.reducer";
import ObjectGroupReducer from "./reducers/systemManagement/ObjectsGroup/ObjectGroup.reducer";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    codeMng: CodeMngReducer,
    loading: LoadingReducer,
    roles: RolesReducer,
    objects: ObjectsReducer,
    menuParent: MenuParentReducer,
    premiumList: PreimiumReducer,
    objectsGroup: ObjectGroupReducer
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
