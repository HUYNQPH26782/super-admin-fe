import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoles } from "../../../interface/response/systemManagement/roles/Roles.interface";
import { RootState } from "../../store";

const initialState: IRoles[] = [];

export const RolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        SetRoles: (state, action: PayloadAction<IRoles[]>) => {
            state = action.payload;
            return state;
        },
        AddRoles: (state, action: PayloadAction<IRoles>) => {
            state = [action.payload].concat(state);
            return state;
        },
        DeleteRoles: (state, action: PayloadAction<IRoles>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
    },
});
export const { SetRoles, AddRoles, DeleteRoles } = RolesSlice.actions;
export const GetRoles = (state: RootState) => state.roles;
export default RolesSlice.reducer;
