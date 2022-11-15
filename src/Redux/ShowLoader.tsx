import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface _showLoader {
	showLoader: boolean;
}

const initialState: _showLoader = {
	showLoader: false,
};

export const showLoaderSlice = createSlice({
	name: "showLoader",
	initialState,
	reducers: {
		setShowLoader: (state, action: PayloadAction<boolean>) => {
			state.showLoader = action.payload;
		},
	},
});

export const { setShowLoader } = showLoaderSlice.actions;

export default showLoaderSlice.reducer;
