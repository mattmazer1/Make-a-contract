import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface _loggedIn {
	loggedIn: boolean;
}

const initialState: _loggedIn = {
	loggedIn: false,
};

export const loggedInSlice = createSlice({
	name: "loggedIn",
	initialState,
	reducers: {
		setLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.loggedIn = action.payload;
		},
	},
});

export const { setLoggedIn } = loggedInSlice.actions;

export default loggedInSlice.reducer;
