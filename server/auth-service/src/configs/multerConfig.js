import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { Auth } from './../model/authModel.js';

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const userId = req.params.id;
            const userRole = req.user.payload.role;
            const userPayloadId = req.user.payload.id;

            if ((userRole === 'customer' && userPayloadId === userId) || 
                (userRole === 'admin' && (userId === userPayloadId || userId !== userPayloadId))) {
                
                const userFolder = path.join('./src/public/uploads/avatar/', userId);
                
                if (!fs.existsSync(userFolder)) {
                    fs.mkdirSync(userFolder);
                } else {
                    fs.readdirSync(userFolder).forEach((file) => {
                        const filePath = path.join(userFolder, file);
                        fs.unlinkSync(filePath);
                    });
                }
                return cb(null, userFolder);
            } else {
                return cb(new Error('Unauthorized: Invalid user role or ID for uploading avatar'));
            }
        } catch (error) {
            return cb(error);
        }
    },
    filename: async function (req, file, cb) {
        try {
            const userId = req.params.id;
            if (userId) {
                const user = await Auth.findById(userId);
                if (!user) {
                    return cb(new Error('User not found'));
                }
                user.avatar = file.originalname;
                await user.save();
            }
            cb(null, file.originalname);
        } catch (error) {
            cb(error);
        }
    }
});

// const storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//         // Kiểm tra xem người dùng có phải là admin không
//         const isAdmin = req.user.payload.role === 'admin';
//         // Kiểm tra xem người dùng có tồn tại hay không
//         const isUserExist = req.params.id && (req.user.payload.role === 'admin' || req.params.id === req.user.payload.id);

//         if (isAdmin && isUserExist) {
//             const userFolder = path.join('./src/public/uploads/avatar/' + req.params.id);
//             if (!fs.existsSync(userFolder)) {
//                 fs.mkdirSync(userFolder);
//             } else {
//                 fs.readdirSync(userFolder).forEach((file) => {
//                     const filePath = path.join(userFolder, file);
//                     fs.unlinkSync(filePath);
//                 });
//             }
//             cb(null, userFolder);
//         } else {
//             return cb('Unauthorized');
//         }
//     },
//     filename: async function (req, file, cb) {
//         if (req.params.id) {
//             const user = await Auth.findById(req.params.id);
//             if (!user) {
//                 return cb({ message: 'User not found' });
//             }
//             user.avatar = file.originalname;
//             await user.save();
//         }
//         cb(null, file.originalname);
//     }
// });

// const storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//         if(req.user.payload.role === 'customer' && req.user.payload.id === req.params.id){
//             const userFolder = path.join('./src/public/uploads/avatar/' + req.params.id);
//             if (!fs.existsSync(userFolder)) {
//                 fs.mkdirSync(userFolder);
//             } else {
//                 fs.readdirSync(userFolder).forEach((file) => {
//                     const filePath = path.join(userFolder, file);
//                     fs.unlinkSync(filePath);
//                 });
//             }
//             cb(null, userFolder);
//         } else if(req.user.payload.role === 'admin' && req.params.id !== req.user.payload.id){
//             const userFolder = path.join('./src/public/uploads/avatar/' + req.params.id);
//             if (!fs.existsSync(userFolder)) {
//                 fs.mkdirSync(userFolder);
//             } else {
//                 fs.readdirSync(userFolder).forEach((file) => {
//                     const filePath = path.join(userFolder, file);
//                     fs.unlinkSync(filePath);
//                 });
//             }
//             cb(null, userFolder);
//         } else {
//             return cb({
//                 code: 'INVALID_USER_ROLE',
//                 message: 'Invalid user role or ID for uploading avatar'
//             });
//         }
//     },
//     filename: async function (req, file, cb) {
//         if(req.params.id){
//             const user = await Auth.findById(req.params.id);
//             if (!user) {
//                 return cb({ message: 'User not found' });
//             }
//             user.avatar = file.originalname;
//             await user.save();
//         }
//         cb(null, file.originalname);
//     }
// });

// const storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//         if(req.user.payload.role === 'customer' && req.user.payload.id === req.params.id){
//             const userFolder = path.join('./src/public/uploads/avatar/' + req.params.id);
//             if (!fs.existsSync(userFolder)) {
//                 fs.mkdirSync(userFolder);
//             } else {
//                 fs.readdirSync(userFolder).forEach((file) => {
//                     const filePath = path.join(userFolder, file);
//                     fs.unlinkSync(filePath);
//                 });
//             }
//             cb(null, userFolder);
//         } else if(req.user.payload.role === 'admin' && req.params.id){
//             const userFolder = path.join('./src/public/uploads/avatar/' + req.params.id);
//             if (!fs.existsSync(userFolder)) {
//                 fs.mkdirSync(userFolder);
//             } else {
//                 fs.readdirSync(userFolder).forEach((file) => {
//                     const filePath = path.join(userFolder, file);
//                     fs.unlinkSync(filePath);
//                 });
//             }
//             cb(null, userFolder);
//         } else {
//             const error = new Error('Unauthorized');
//             error.message = 'You dont unauthorized upload that user';
//             error.statusCode = 401;
//             return cb(error);
//         }
//     },
//     filename: async function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const storage = multer.diskStorage({
//     destination: async function (req, images, cb) {
//         const userID = req.user.payload.id;
//         console.log(userID)
//         if(userID){
//             const user = await Auth.findById(userID);
//             if (!user) {
//                 return cb({ message: 'User not found' });
//             }
//             const userFolder = path.join('./src/public/uploads/avatar/' + String(user._id));
//             if (!fs.existsSync(userFolder)) {
//                 fs.mkdirSync(userFolder);
//             } else {
//                 // Xóa tất cả các tệp trong thư mục trước khi tải ảnh mới lên
//                 fs.readdirSync(userFolder).forEach((file) => {
//                     const filePath = path.join(userFolder, file);
//                     fs.unlinkSync(filePath);
//                 });
//             }
//             cb(null, userFolder);
//         } else {
//             cb({ message: 'User ID not provided' });
//         }
//     },
//     filename: async function (req, file, cb) {
//         if(req.user.payload.id){
//             const user = await Auth.findById(req.user.payload.id);
//             if (!user) {
//                 return cb({ message: 'User not found' });
//             }
//             user.avatar = file.originalname;
//             await user.save();
//         }
//         cb(null, file.originalname);
//     }
// }

const upload = multer({ storage: storage }).single('avatar');
export default upload;
