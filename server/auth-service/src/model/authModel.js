import mongoose from 'mongoose';

const authEnum = ['admin', 'customer'];
const accountStatus = ['active', 'inactive', 'deleted'];
const sexEnum = ['male', 'female'];

const authSchema = new mongoose.Schema ({
    username: {type: String, required: true},
    fullname: {type: String, required: true},
    password: {type: String, required: true},
    confirmps: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, enum: authEnum, default: 'customer'},
    sex: {type: String, enum: sexEnum, default: 'male'},
    avatar: {type: String},
    lastLogin: {type: Date},
    accountStatus: {type: String, enum: accountStatus, default: 'active'}
}, {
    timestamps: true
})

export const Auth = mongoose.model('Auth', authSchema);
