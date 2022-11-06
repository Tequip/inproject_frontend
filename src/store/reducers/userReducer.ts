import authAPI, { IAuthPayload, IAuthResponse } from "api/authAPI";
import { User } from "types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import catchThunkError from "store/helpers/catchThunkError";

const accessToken = localStorage.getItem("accessToken")
	? localStorage.getItem("accessToken")
	: null;

const refreshToken = localStorage.getItem("refreshToken")
	? localStorage.getItem("refreshToken")
	: null;

interface IState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string;
}

const initialState: IState = {
	user: null,
	accessToken,
	refreshToken,
	isAuthenticated: !!accessToken,
	loading: false,
	error: ""
};

export const loginUser = createAsyncThunk(
	"user/login",
	async (payload: IAuthPayload, { rejectWithValue }) => {
		try {
			return await authAPI.login(payload);
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

export const registerUser = createAsyncThunk(
	"user/register",
	async (payload: IAuthPayload, { rejectWithValue }) => {
		try {
			return await authAPI.register(payload);
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

export const reloginUser = createAsyncThunk(
	"user/relogin",
	async (_, { rejectWithValue }) => {
		try {
			return await authAPI.relogin();
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

const onPending = (state: IState) => {
	state.loading = true;
	state.error = "";
};

const onRejected = (state: IState, action: PayloadAction<string | { detail: string }>) => {
	state.accessToken = null;
	state.loading = false;
	state.error = typeof action.payload === 'object' ? action.payload?.detail : action.payload;
	state.user = null;

	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
};

const onFulfilled = (state: IState, action: PayloadAction<IAuthResponse>) => {
	state.user = action.payload?.user;
	state.isAuthenticated = true;
	state.loading = false;
	state.error = "";

	if (action.payload?.access_token) {
		state.accessToken = action.payload?.access_token;
		localStorage.setItem("accessToken", state.accessToken ? state.accessToken : '');
	}

	if (action.payload?.refresh_token) {
		state.refreshToken = action.payload?.refresh_token;
		localStorage.setItem("refreshToken", state.refreshToken ? state.refreshToken : '');
	}
};

const onReloginFulfilled = (state: IState, action: PayloadAction<IAuthResponse>) => {
	state.user = action.payload?.user;
	state.isAuthenticated = true;
	state.loading = false;
	state.error = "";
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.accessToken = null;
			state.refreshToken = null;
			state.loading = false;
			state.error = "";
			state.user = null

			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		}
	},
	extraReducers: {
		[loginUser.pending.type]: onPending,
		[loginUser.rejected.type]: onRejected,
		[loginUser.fulfilled.type]: onFulfilled,
		[registerUser.pending.type]: onPending,
		[registerUser.rejected.type]: onRejected,
		[registerUser.fulfilled.type]: onFulfilled,
		[reloginUser.pending.type]: onPending,
		[reloginUser.rejected.type]: onRejected,
		[reloginUser.fulfilled.type]: onReloginFulfilled
	}
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
