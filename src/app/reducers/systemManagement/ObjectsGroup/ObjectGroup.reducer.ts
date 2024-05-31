import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { IObjectsGroup } from "../../../../interface/response/systemManagement/objectsGroup/ObjectGroup.interface";

const initialState: IObjectsGroup[] = [];

export const ObjectsGroupSlice = createSlice({
    name: "objectsGroup",
    initialState,
    reducers: {
        SetObjectsGroup: (state, action: PayloadAction<IObjectsGroup[]>) => {
            state = action.payload;
            return state;
        },
        AddObjectsGroup: (state, action: PayloadAction<IObjectsGroup>) => {
            state = [action.payload].concat(state);
            return state;
        },
        DeleteObjectsGroup: (state, action: PayloadAction<IObjectsGroup>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
    },
});
export const { SetObjectsGroup, AddObjectsGroup, DeleteObjectsGroup } = ObjectsGroupSlice.actions;
export const GetObjectsGroup = (state: RootState) => state.objectsGroup;
export default ObjectsGroupSlice.reducer;
