import axios from "axios";

import { login, logout } from '@/lib/features/user/authSlice';

const url = process.env.NEXT_PUBLIC_API_BACKEND;

export const getAllUser = async(accessToken) => {
    try {
        const response = await axios.get(`${url}/auth-service/get-all-user`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get All User Router Error: ', error);
        throw error;
    }
}

export const getDetailUser = async(id, accessToken) => {
    try {
        const response = await axios.get(`${url}/auth-service/get-detail-user/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get Detail User Router Error: ', error);
        throw error;
    }
}

export const updateUser = async(id, data, accessToken) => {
    try {
        const response = await axios.patch(`${url}/auth-service/update-user/${id}`, data, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Get Update User Router Error: ', error);
        throw error;
    }
}

export const deleteUser = async(id, accessToken) => {
    try {
        const response = await axios.delete(`${url}/auth-service/delete-user/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.message;
    } catch (error) {
        console.log('Get Delete User Router Error: ', error);
        throw error;
    }
}

export const Login = async(bodyFormData, dispatch) => {
    try {
        const response = await axios.post(`${url}/auth-service/login`, bodyFormData);
        const { data, accessToken, refreshToken } = response.data;
        dispatch(login({ data, accessToken, refreshToken }));
        return response.data.data.role;
    } catch (error) {
        console.log('Login Router Error: ', error);
        throw error;
    }
}

export const Register = async(bodyFormData) => {
    try {
        const response = await axios.post(`${url}/auth-service/register`, bodyFormData);
        return response.data.data;
    } catch (error) {
        console.log('Register Router Error: ', error);
        throw error;
    }
}

export const updateStatusToActive = async(id, accessToken) => {
    try {
        const response = await axios.patch(`${url}/auth-service/update-status-to-active/${id}`, null, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Update Status To Active Router Error: ', error);
        throw error;
    }
}

export const updateStatusToInactive = async(id, accessToken) => {
    try {
        const response = await axios.patch(`${url}/auth-service/update-status-to-inactive/${id}`, null, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Update Status To Inactive Router Error: ', error);
        throw error;
    }
}

export const updateStatusToDeleted = async(id, accessToken) => {
    try {
        const response = await axios.patch(`${url}/auth-service/update-status-to-deleted/${id}`, null, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Update Status To Deleted Router Error: ', error);
        throw error;
    }
}

export const Logout = (dispatch) => {
    dispatch(logout());
}