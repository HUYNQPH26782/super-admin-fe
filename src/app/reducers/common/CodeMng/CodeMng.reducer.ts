import { ICodeMng } from './../../../../interface/response/common/codeMng/CodeMng.interface';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

const initialState: ICodeMng[] = [];

export const CodeMngSlice = createSlice({
    name: "codeMng",
    initialState,
    reducers: {
        SetCodeMng: (state, action: PayloadAction<ICodeMng[]>) => {
            state = action.payload;
            return state;
        }
    },
});
export const { SetCodeMng } = CodeMngSlice.actions;
export const GetCodeMng = (state: RootState) => state.codeMng;
export default CodeMngSlice.reducer;
