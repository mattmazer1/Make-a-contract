import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Address {
	walletAddress: string;
}

const initialState: Address = {
	walletAddress: "",
};

export const walletAddressSlice = createSlice({
	name: "walletAddress",
	initialState,
	reducers: {
		setWalletAddress: (state, action: PayloadAction<string>) => {
			state.walletAddress = action.payload;
		},
	},
});

export const { setWalletAddress } = walletAddressSlice.actions;

export default walletAddressSlice.reducer;
