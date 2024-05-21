import axios from "axios";
import querystring from 'querystring';

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

export const Login = async(bodyFormData) => {
    try {
        const response = await axios.post(`${url}/auth-service/login`, querystring.stringify(bodyFormData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.data;
    } catch (error) {
        console.log('Login Router Error: ', error);
        throw error;
    }
}

export const Register = async(data) => {
    try {
        const response = await axios.get(`${url}/auth-service/register`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.log('Register Router Error: ', error);
        throw error;
    }
}