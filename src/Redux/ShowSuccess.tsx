import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface _showSuccess {
	showSuccess: boolean;
}

const initialState: _showSuccess = {
	showSuccess: false,
};

export const showSuccessSlice = createSlice({
	name: "showSuccess",
	initialState,
	reducers: {
		setShowSuccess: (state, action: PayloadAction<boolean>) => {
			state.showSuccess = action.payload;
		},
	},
});

export const { setShowSuccess } = showSuccessSlice.actions;

export default showSuccessSlice.reducer;
