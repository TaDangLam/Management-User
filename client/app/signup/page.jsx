'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FaRegUser, FaRegAddressCard } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import Swal from "sweetalert2";

import { Register } from "../api/route";

const Signup = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [fullname, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmps, setConfirmps] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('male');

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const bodyFormData = new FormData();
            bodyFormData.append('username', username);
            bodyFormData.append('fullname', fullname);
            bodyFormData.append('password', password);
            bodyFormData.append('confirmps', confirmps);
            bodyFormData.append('email', email);
            bodyFormData.append('phone', phone);
            bodyFormData.append('sex', sex);

            await Register(bodyFormData);
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
                title: "Signup is successfully"
              });
            router.push('/');
        }catch(error){
            Swal.fire({
                icon: 'error',
                text: `${error.response.data.error}`,
            });
        }
    }

    const handleGenderChange = (e) => {
        setSex(e.target.value);
    };

    return ( 
        <div className="flex items-center justify-center h-screen ">
            <div className="flex flex-col bg-slate-200 h-2/4 w-1/2 shadow-2xl rounded-[25px] pt-6 pb-2">
                <div className="flex flex-col items-center justify-center w-full h-1/6 gap-3 pt-2">
                    <div className="flex text-5xl font-bold items-center justify-center text-[#005AA7] w-full h-1/3">Sign Up</div>
                    <div className="flex items-center justify-center text-[#005AA7] w-full h-1/3 pt-5">---------------------------</div>
                    <Link href={'/'} className="flex items-center justify-center w-full h-1/3 hover:text-[#005AA7] hover:opacity-75 duration-300">If you have an account, Login</Link>
                </div>
                <form onSubmit={handleRegister} className="flex flex-col items-center justify-center w-full h-5/6 mt-5 pt-5">
                    <div className="flex items-center justify-center gap-3 w-full h-4/6 ">
                        <div className="flex flex-col items-end gap-2 h-full w-1/2 ">

                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <FaRegUser className="w-1/12"/>
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </label>

                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100 ">
                                <AiOutlineLock className="w-1/12"/>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100 ">
                                <AiOutlineLock className="w-1/12"/>
                                <input 
                                    type="password" 
                                    placeholder="Repeat Password" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={confirmps}
                                    onChange={(e) => setConfirmps(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="flex flex-col items-start gap-2 h-full w-1/2 ">

                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <FaRegAddressCard className="w-1/12"/>
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={fullname}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </label>

                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <AiOutlineMail className="w-1/12"/>
                                <input 
                                    type="text" 
                                    placeholder="Email" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                                <FiPhoneCall className="w-1/12"/>
                                <input 
                                    type="text" 
                                    placeholder="Phone" 
                                    className="w-11/12 bg-slate-100 outline-none"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>

                        </div>
                    </div>
                    <div className="flex gap-10 w-full h-1/6 items-center justify-center">
                        <label className="flex gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="sex" 
                                value="male"
                                className="cursor-pointer"
                                checked={sex === 'male'} 
                                onChange={handleGenderChange} 
                            />
                            Male
                        </label>
                        <label className="flex gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="sex" 
                                value="female" 
                                className="cursor-pointer"
                                checked={sex === 'female'} 
                                onChange={handleGenderChange} 
                            />
                            Female
                        </label>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center h-1/6">
                        <button type="submit" className="flex items-center justify-center font-semibold bg-[#005AA7] text-white h-full w-36 rounded-full  p-3 hover:opacity-75 duration-300 ">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Signup;