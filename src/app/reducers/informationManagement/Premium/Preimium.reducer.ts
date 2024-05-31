import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { IPremium } from "../../../../interface/response/informationManagement/premium/Premium.interface";

const initialState: IPremium[] = [];

export const PremiumSlice = createSlice({
    name: "premiumList",
    initialState,
    reducers: {
        SetPremium: (state, action: PayloadAction<IPremium[]>) => {
            state = action.payload;
            return state;
        },
        AddPremium: (state, action: PayloadAction<IPremium>) => {
            state = [action.payload].concat(state);
            return state;
        },
        DeletePremium: (state, action: PayloadAction<IPremium>) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
    },
});
export const { SetPremium, AddPremium, DeletePremium } = PremiumSlice.actions;
export const GetPremium = (state: RootState) => state.premiumList;
export default PremiumSlice.reducer;
