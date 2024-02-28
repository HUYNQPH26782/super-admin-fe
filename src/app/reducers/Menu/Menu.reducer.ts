import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import type { IMenu } from "../../../interface/Menu.interface";

const initialState: IMenu[] = [];

export const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        SetMenu: (state, action: PayloadAction<IMenu[]>) => {
            state = action.payload;
            return state;
        },
        AddMenu: (state, action: PayloadAction<IMenu>) => {
            state = [action.payload].concat(state);
            return state;
        },
        DeleteMenu: (state, action: PayloadAction<IMenu>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
    },
});
export const { SetMenu, AddMenu, DeleteMenu } = MenuSlice.actions;
export const GetMenu = (state: RootState) => state.menu;
export default MenuSlice.reducer;
