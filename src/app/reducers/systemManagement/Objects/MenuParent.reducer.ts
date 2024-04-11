import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { ICodeMng } from "../../../../interface/response/common/codeMng/CodeMng.interface";

const initialState: ICodeMng[] = [];

export const MenuParentSlice = createSlice({
    name: "menuParent",
    initialState,
    reducers: {
        SetMenuParent: (state, action: PayloadAction<ICodeMng[]>) => {
            state = action.payload;
            return state;
        }
    },
});
export const { SetMenuParent } = MenuParentSlice.actions;
export const GetMenuParent = (state: RootState) => state.menuParent;
export default MenuParentSlice.reducer;
