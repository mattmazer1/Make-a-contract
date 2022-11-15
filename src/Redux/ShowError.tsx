import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface _showError {
	showError: boolean;
}

const initialState: _showError = {
	showError: false,
};

export const showErrorSlice = createSlice({
	name: "showError",
	initialState,
	reducers: {
		setShowError: (state, action: PayloadAction<boolean>) => {
			state.showError = action.payload;
		},
	},
});

export const { setShowError } = showErrorSlice.actions;

export default showErrorSlice.reducer;
