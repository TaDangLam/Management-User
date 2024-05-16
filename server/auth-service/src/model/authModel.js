import mongoose from 'mongoose';

const authEnum = ['admin', 'customer'];
const accountStatus = ['active, disable, deleted'];

const authSchema = new mongoose.Schema ({
    username: {type: String, required: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: authEnum, default: 'customer'},
    token: {type: String, required: true},
    tokenExpiryDate: {type: Date},
    lastLogin: {type: Date},
    accountStatus: {type: String, enum: accountStatus, default: 'disable'}
}, {
    timestamps: true
})

export const Auth = mongoose.model('Auth', authSchema);
