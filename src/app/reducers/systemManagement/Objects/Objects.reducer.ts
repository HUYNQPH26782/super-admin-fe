import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { IObjects } from "../../../../interface/response/systemManagement/objects/Objects.interface";

const initialState: IObjects[] = [];

export const ObjectsSlice = createSlice({
    name: "objects",
    initialState,
    reducers: {
        SetObjects: (state, action: PayloadAction<IObjects[]>) => {
            state = action.payload;
            return state;
        },
        AddObjects: (state, action: PayloadAction<IObjects>) => {
            state = [action.payload].concat(state);
            return state;
        },
        DeleteObjects: (state, action: PayloadAction<IObjects>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
    },
});
export const { SetObjects, AddObjects, DeleteObjects } = ObjectsSlice.actions;
export const GetObjects = (state: RootState) => state.objects;
export default ObjectsSlice.reducer;
