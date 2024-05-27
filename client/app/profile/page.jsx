'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { FaRegTrashCan } from "react-icons/fa6";

import { updateUser } from "../api/route";


const Profile = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const router = useRouter();
    const [initialValues, setInitialValues] = useState(user);
    const [fullname, setFullName] = useState(user.fullname);
    const [password, setPassword] = useState('');
    const [confirmps, setConfirmps] = useState('');
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [sex, setSex] = useState(user.sex);
    const [images, setImages] = useState();
    const [imagePreview, setImagePreview] = useState(`${process.env.NEXT_PUBLIC_API_IMAGES}/${user._id}/${user.avatar}`);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    const [hovered, setHovered] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const handleImageRemove = () => {
        setImages(null);
        setImagePreview(null);
    }

    const handleUpdate = async() => {
        try{
            const formatDate = dateOfBirth ? format(new Date(dateOfBirth), 'yyyy-MM-dd') : null;
            const bodyFormData = new FormData();
            if (fullname !== initialValues.fullname) bodyFormData.append('fullname', fullname);
            if (email !== initialValues.email) bodyFormData.append('email', email);
            if (phone !== initialValues.phone) bodyFormData.append('phone', phone);
            if (sex !== initialValues.sex) bodyFormData.append('sex', sex);
            if (formatDate) bodyFormData.append('dateOfBirth', formatDate);
            if (password !== initialValues.password) bodyFormData.append('password', password);
            if (confirmps !== initialValues.confirmps) bodyFormData.append('confirmps', confirmps);
            if (images) bodyFormData.append('avatar', images);

            const userUpdate = await updateUser(user._id, bodyFormData, accessToken);
            sessionStorage.setItem('user', JSON.stringify(userUpdate));

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
                
              });
            Toast.fire({
                icon: "success",
                title: "Update Information is Success!"
            });
            router.push('/profile');
        }catch(error){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
                
              });
            Toast.fire({
                icon: "error",
                title: "Updated Failed!",
                text: `${error}`
            });
        }
    }

    return ( 
        <div className="flex gap-4 p-3 w-full h-full">
            <form onSubmit={handleUpdate} className="w-full h-full ">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Full Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="fullname"
                                type="text"
                                value={fullname}
                                onChange={e => setFullName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Sex
                            </label>
                            <select
                                id="sex"
                                type="text"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Email
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email"
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Phone
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6  w-full">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 w-full">
                                Date Of Birth
                            </label>
                            <DatePicker 
                                selected={dateOfBirth} 
                                onChange={(date) => setDateOfBirth(date)}
                                placeholderText="Select Date Of Birth..."
                                className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6 px-3 w-full gap-3">
                        {imagePreview && (
                            <div
                                className="relative flex items-center"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                            >
                                <img
                                    src={imagePreview}
                                    alt="Image Preview"
                                    className="w-32 h-32 rounded-lg object-cover"
                                />
                                {hovered && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 duration-300 rounded-lg cursor-pointer"
                                        onClick={handleImageRemove}
                                    >
                                        <FaRegTrashCan className="text-white" />
                                    </div>
                                )}
                            </div>
                        )}
                        <label
                            onChange={handleImageChange}
                            className="border w-32 h-32 text-center flex items-center justify-center gap-1 rounded-lg bg-gray-200 cursor-pointer text-[#4b6cb7] hover:bg-[#4b6cb7] duration-500 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <div>Avatar</div>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    <div className={`flex flex-wrap -mx-3 py-3 rounded-md mb-1.5 text-gray-500`}>
                        <div className="w-full px-3 mb-6">
                            <h2 className="text-xl w-full mb-6 uppercase font-bold">
                                Change password
                            </h2>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Password
                            </label>
                            <input
                                className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                                id="grid-password"
                                type="password"
                                placeholder="******************"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="text-gray-600 text-xs italic">
                                Keep blank if you don't want to change
                            </p>
                        </div>
    
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Repeat Password
                            </label>
                            <input
                                className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-gray-300`}
                                id="grid-password"
                                type="password"
                                placeholder="******************"
                                value={confirmps}
                                onChange={(e) => setConfirmps(e.target.value)}
                            />
                            <label className="inline-flex items-center mt-3">
                                
                                
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" className="bg-gradient-to-r from-[#4b6cb7] to-[#1CB5E0] hover:shadow-2xl text-white font-bold py-2 px-4  w-36 rounded duration-300">
                            Save
                    </button>
                </form>
        </div>
    );
}
 
export default Profile;