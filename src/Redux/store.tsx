import { configureStore } from "@reduxjs/toolkit";
import walletAddressSlice from "./walletAddress";
import loggedInSlice from "./LoggedIn";
import paySlice from "./pay";
import showSuccessSlice from "./ShowSuccess";
import showErrorSlice from "./ShowError";
import showLoaderSlice from "./ShowLoader";

export const store = configureStore({
	reducer: {
		walletAddress: walletAddressSlice,
		loggedIn: loggedInSlice,
		pay: paySlice,
		showSuccess: showSuccessSlice,
		showError: showErrorSlice,
		showLoader: showLoaderSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
