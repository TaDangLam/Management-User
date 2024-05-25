import bcrypt from 'bcrypt';

import { Auth } from '../model/authModel.js';
import middlewareToken from './jwtService.js';

const authService = {
    register: async(newUser) => {
        const { username, fullname, password, confirmps, email, phone, sex, dateOfBirth } = newUser;
        try {
            const checkUser = await Auth.findOne({ username });
            // console.log(checkUser)
            if (checkUser) {
                throw new Error('This user is exist');
            }
            const hashed = bcrypt.hashSync(password, 10)
            const newUserDoc = new Auth({
                username,
                fullname,
                email,
                password: hashed,
                confirmps: hashed,
                phone,
                sex,
                dateOfBirth: new Date(dateOfBirth)
            });
            const user = await newUserDoc.save();
            return {
                status: "OK",
                message: "CREATED",
                data: user
            };
        } catch (error) {   
            throw new Error(error.message);
        }
    },
    login: async(user) => {
        const { username, password } = user;
            try {
                const checkUser = await Auth.findOne({ username });
                if(checkUser === null) {
                    throw new Error('User is not exist');
                }
                const comparePassword = bcrypt.compareSync(password, checkUser.password);
                // console.log('comparePassword: ',comparePassword);
                if(!comparePassword){
                    throw new Error('Password is not incorrect');
                }
                
                // Lưu đăng nhập
                checkUser.lastLogin = new Date();
                await checkUser.save();
                
                // create AccessToken
                const accessToken = await middlewareToken.genneralAccessToken({
                    id: checkUser._id,
                    role: checkUser.role
                })
                // create RefreshToken
                const refreshToken = await middlewareToken.genneralRefreshToken({
                    id: checkUser._id,
                    role: checkUser.role
                })

                const userWithoutPassword = {
                    ...checkUser._doc,
                    password: undefined,
                    confirmps: undefined,
                };
                
                return({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: userWithoutPassword,
                    accessToken,
                    refreshToken,
                })
            } catch (error) {
                throw new Error(error.message);
            }
    },
    searchUser: async(keyword) => {
        try {
            let users;
            // const roleToSearch = keyword.toLowerCase() === 'customer' ? 'customer' : 'staff';
            const isValidObjectId = mongoose.Types.ObjectId.isValid(keyword);
            
            if (isValidObjectId) {
                users = await User.find({ _id: keyword, role: { $ne: 'admin' } }).populate('address');
            } else {
                users = await User.find({
                    $and: [
                        {
                            $or: [
                                { name: { $regex: keyword, $options: 'i' } },
                                { fullName: { $regex: keyword, $options: 'i' } },
                                { phone: { $regex: keyword } }
                            ]
                        },
                        // { role: roleToSearch },
                        { role: { $ne: 'admin' } }
                    ]
                }).populate('address');
            }
            
            return {
                status: 'OK',
                data: users
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllUser: async() => {
        try {
            const allUser = await Auth.find({ role: 'customer'});
            return {
                status: 'OK',
                message: 'Get all user is success',
                data: allUser
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getDetailUser: async(id) => {
        try {
            const checkUser = await Auth.findById(id);
            if (!checkUser){
                throw new Error('This user is exist'); 
            }
            return{
                status: 'OK',
                message: 'SUCCESS',
                data: checkUser
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateUser: async(id, data) => {
        try {
            const { username, fullname, password, confirmps, phone, email, accountStatus, avatar, sex, dateOfBirth } = data;
            const checkUser = await Auth.findById(id);
            if(checkUser === null) {
                throw new Error('User is not exist');
            }
            const filterImages = Array.isArray(avatar) ? avatar.filter(newImg => !checkUser.avatar.includes(newImg)) : [];

            const updateFields = {};
            if (email) updateFields.email = email;
            if (fullname) updateFields.fullname = fullname;
            if (phone) updateFields.phone = phone;
            if (password && confirmps) {
                if (password !== confirmps) {
                    throw new Error('Password and Confirm Password do not match');
                }
                const hashedPassword = bcrypt.hashSync(password, 10);
                updateFields.password = hashedPassword;
                updateFields.confirmps = hashedPassword;
            }
            if (sex) updateFields.sex = sex;
            if (dateOfBirth) updateFields.dateOfBirth = new Date(dateOfBirth);
            
            if (filterImages.length > 0) {
                updateFields.avatar = filterImages;
            }
            const updatedUser = await Auth.findByIdAndUpdate(id, updateFields, { new: true });
            return({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    deleteUser: async(id) => {
        try {
            const checkUser = await Auth.findById(id);
            if(checkUser === null) {
                throw new Error('User is not exist');
            }
            await Auth.findByIdAndUpdate(id, { accountStatus: 'deleted' }, { new: true});
                return ({
                    status: 'OK',
                    message: 'Deleted User is successfully'
                })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateStatusToActive: async(id, data) => {
        try {
            const user = await Auth.findById(id);
            if(!user) {
                throw new Error('User is not found');
            }
            user.accountStatus = data;
            const newAccountStatus = await user.save();
            return({
                status: 'OK',
                message: 'Update Status is Successfully',
                data: newAccountStatus
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateStatusToInactive: async(id, data) => {
        try {
            const user = await Auth.findById(id);
            if(!user) {
                throw new Error('User is not found');
            }
            user.accountStatus = data;
            const newAccountStatus = await user.save();
            return({
                status: 'OK',
                message: 'Update Status is Successfully',
                data: newAccountStatus
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateStatusToDeleted: async(id, data) => {
        try {
            const user = await Auth.findById(id);
            if(!user) {
                throw new Error('User is not found');
            }
            user.accountStatus = data;
            const newAccountStatus = await user.save();
            return({
                status: 'OK',
                message: 'Update Status is Successfully',
                data: newAccountStatus
            })
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default authService;
