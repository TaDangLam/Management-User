import bcrypt from 'bcrypt';

import { Auth } from '../model/authModel.js';
import middlewareToken from './jwtService.js';

const authService = {
    register: async(newUser) => {
        const { username, fullname, password, confirmps, email, phone } = newUser;
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
            const { username, fullname, password, confirmps, phone, email, accountStatus } = data;
            const checkUser = await Auth.findById(id);
            if(checkUser === null) {
                throw new Error('User is not exist');
            }
            const updateFields = {};
            if (email) updateFields.email = email;
            if (fullname) updateFields.fullname = fullname;
            if (phone) updateFields.phone = phone;
            if (password && confirmps) {
                if (password !== confirmps) {
                    throw new Error('Password and confirmPassword do not match');
                }
                const hashedPassword = bcrypt.hashSync(password, 10);
                updateFields.password = hashedPassword;
                updateFields.confirmps = hashedPassword;
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
};

export default authService;