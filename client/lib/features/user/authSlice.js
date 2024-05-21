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
        // addNewAddress: (state, action) => {
        //     state.user.address.push(action.payload);
        // },
        // updateAddress: (state, action) => {
        //     const index = state.user.address.findIndex(addr => addr._id === action.payload._id);
        //     if(index !== -1){
        //         state.user.address[index] = action.payload;
        //     }
        // },
        // deleteAddress: (state, action) => {
        //     state.user.address = state.user.address.filter(addr => addr._id !== action.payload);
        // }

    }
})

export const { login, logout, register, Updateuser } = authSlice.actions;
export default authSlice.reducer;