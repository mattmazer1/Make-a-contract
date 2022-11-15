import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface _pay {
	pay: boolean;
}

const initialState: _pay = {
	pay: false,
};

export const paySlice = createSlice({
	name: "pay",
	initialState,
	reducers: {
		setPay: (state, action: PayloadAction<boolean>) => {
			state.pay = action.payload;
		},
	},
});

export const { setPay } = paySlice.actions;

export default paySlice.reducer;
