import { createSlice } from "@reduxjs/toolkit";

interface IState {
	isShowAuthModal: boolean;
}

const initialState: IState = {
	isShowAuthModal: false,
};

export const modalsSlice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		showAuthModal(state) {
			state.isShowAuthModal = true;
		},
		hideAuthModal(state) {
			state.isShowAuthModal = false;
		}
	}
});

export const { showAuthModal, hideAuthModal } = modalsSlice.actions;
export default modalsSlice.reducer;
