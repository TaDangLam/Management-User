import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { Auth } from './../model/authModel.js';

const storage = multer.diskStorage({
    destination: async function (req, images, cb) {
        const userID = req.user.payload.id;
        console.log(userID)
        if(userID){
            const user = await Auth.findById(userID);
            if (!user) {
                return cb({ message: 'User not found' });
            }
            const userFolder = path.join('./src/public/uploads/avatar/' + String(user._id));
            if (!fs.existsSync(userFolder)) {
                fs.mkdirSync(userFolder);
            } else {
                // Xóa tất cả các tệp trong thư mục trước khi tải ảnh mới lên
                fs.readdirSync(userFolder).forEach((file) => {
                    const filePath = path.join(userFolder, file);
                    fs.unlinkSync(filePath);
                });
            }
            cb(null, userFolder);
        } else {
            cb({ message: 'User ID not provided' });
        }
    },
    filename: async function (req, file, cb) {
        if(req.user.payload.id){
            const user = await Auth.findById(req.user.payload.id);
            if (!user) {
                return cb({ message: 'User not found' });
            }
            user.avatar = file.originalname;
            await user.save();
        }
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('avatar');
export default upload;
