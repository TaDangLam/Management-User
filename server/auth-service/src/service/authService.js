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
};

export default authService;
