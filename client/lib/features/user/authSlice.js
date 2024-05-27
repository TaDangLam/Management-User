import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.data;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            sessionStorage.setItem('user', JSON.stringify(action.payload.data));
            sessionStorage.setItem('accessToken', action.payload.accessToken);
            sessionStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        register: (state, action) => {
            state.user = action.payload;
        },
        Updateuser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            sessionStorage.clear();
        },
        UpdateUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { login, logout, register, UpdateUser } = authSlice.actions;
export default authSlice.reducer;