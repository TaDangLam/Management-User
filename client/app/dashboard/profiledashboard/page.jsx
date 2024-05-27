'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";
import { format } from "date-fns";
import Swal from "sweetalert2";

import { updateUser } from "@/app/api/route";

const ProfileAdmin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const accessToken = sessionStorage.getItem('accessToken');
    // const user = useSelector(state => state.auth.user);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [initialValues, setInitialValues] = useState(user);
    const [fullname, setFullName] = useState(user?.fullname);
    const [password, setPassword] = useState('');
    const [confirmps, setConfirmps] = useState('');
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [sex, setSex] = useState(user?.sex);
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
    const [images, setImages] = useState(user?.avatar);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
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

    const handleRegister = async(e) => {
        e.preventDefault();
        try {
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

            const updatedUser = await updateUser(user._id, bodyFormData, accessToken);
            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            // Convert for console.log
            // const formDataObj = {};
            // for (let pair of bodyFormData.entries()) {
            //     formDataObj[pair[0]] = pair[1];
            // }
            // console.log(formDataObj)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Update is Successfully"
            });
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Update Failed",
                text: `${error.response.data.error}`
            });
        }

    }

    return ( 
        <div>
        {loading ? (
            <div className="text-center py-40">
            Loading......
            </div>
        ) : (
            <div className="">
                <form onSubmit={handleRegister} encType="multipart/form-data" className="flex flex-col gap-8 w-full h-full">
                    <div className="flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" >
                            Full Name
                        </label>
                        <input
                            id="user"
                            type="text"
                            placeholder="Please enter full name...."
                            className="p-1.5 rounded-lg"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
            
                    <div className="flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" >
                            Sex
                        </label>
                        <select id="user" type="text" className="p-1.5 rounded-lg" value={sex} onChange={(e) => setSex(e.target.value)} >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
            
                    <div className="flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="*************"
                            className="p-1.5 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className="flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold">
                            Confirm Password
                        </label>
                        <input
                            id="confirmpassword"
                            type="password"
                            placeholder="*************"
                            className="p-1.5 rounded-lg"
                            value={confirmps}
                            onChange={(e) => setConfirmps(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className="flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Please enter email...."
                            className="p-1.5 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className="flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" >
                            Phone
                        </label>
                        <input
                            id="phone"
                            type="text"
                            placeholder="Please enter phone...."
                            className="p-1.5 rounded-lg"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold">
                            Date Of Birth
                        </label>
                        <DatePicker 
                            selected={dateOfBirth} 
                            onChange={(date) => setDateOfBirth(date)}
                            placeholderText="Select Date Of Birth..."
                            className="p-1.5 rounded-lg w-full"
                        />
                    </div>


                    <div className="flex gap-4 w-full h-1/6">
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

                    <button type="submit" className="text-white bg-[#4b6cb7] hover:bg-blue-900 py-1 rounded-md w-1/12 duration-300 h-1/6">
                        Save
                    </button>
                </form>
            </div>
        )}
    </div>
    );
}
 
export default ProfileAdmin;