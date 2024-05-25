'use client'
import Link from "next/link";
import { useState } from "react";
import { MdOutlineToday } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { Register } from "@/app/api/route";


const NewUser = () => {
    const router = useRouter();
    const [username, setUserName] = useState('');
    const [fullname, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmps, setConfirmps] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('male');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const formatDate = format(new Date(dateOfBirth), 'yyyy-MM-dd');

            const bodyFormData = new FormData();
            bodyFormData.append('username', username);
            bodyFormData.append('fullname', fullname);
            bodyFormData.append('password', password);
            bodyFormData.append('confirmps', confirmps);
            bodyFormData.append('email', email);
            bodyFormData.append('phone', phone);
            bodyFormData.append('sex', sex);
            bodyFormData.append('dateOfBirth', formatDate);

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
            router.push('/dashboard/user');
        }catch(error){
            Swal.fire({
                icon: 'error',
                text: `${error.response.data.error}`,
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
            <div className="flex flex-col gap-2">
                <div className="flex item-center gap-4">
                    <Link href={'/dashboard/user'} className="text-[#4b6cb7] text-3xl mb-5 font-bold hover:opacity-60 duration-300">User</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                    <Link href={`/dashboard/user/new`} className="text-[#4b6cb7] text-3xl mb-5 hover:text-btn font-bold">New</Link>
                </div>
                <form onSubmit={handleRegister} encType="multipart/form-data" className="flex flex-col gap-8 w-full h-full">
                    <div className=" flex flex-col w-full h-1/6">
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
            
                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" >
                            Sex
                        </label>
                        <select
                            id="user"
                            type="text"
                            className="p-1.5 rounded-lg"
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
            
                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" >
                            User Name
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Please enter user name...."
                            className="p-1.5 rounded-lg"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Please enter password...."
                            className="p-1.5 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold">
                            Confirm Password
                        </label>
                        <input
                            id="confirmpassword"
                            type="password"
                            placeholder="Please enter confirm password...."
                            className="p-1.5 rounded-lg"
                            value={confirmps}
                            onChange={(e) => setConfirmps(e.target.value)}
                        >
                        </input>
                    </div>

                    <div className=" flex flex-col w-full h-1/6">
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

                    <div className=" flex flex-col w-full h-1/6">
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

                    <button type="submit" className="text-white bg-[#4b6cb7] hover:bg-blue-900 py-1 rounded-md w-1/12  h-1/6">
                        Save
                    </button>
                </form>
            </div>
        )}
    </div>
    );
}
 
export default NewUser;