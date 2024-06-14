'use client'
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RegisterMultiple } from "@/app/api/route";

const MoreUser = () => {
    const router = useRouter();
    const accessToken = sessionStorage.getItem('accessToken');
    const [users, setUsers] = useState([{ username: '', fullname: '', password: '', confirmps: '', email: '', phone: '', sex: 'male', dateOfBirth: null }]);
    
    const handleInputChange = (index, event) => {
        const values = [...users];
        if (event.target.name === 'dateOfBirth') {
            values[index][event.target.name] = event.target.value;
        } else {
            values[index][event.target.name] = event.target.value;
        }
        setUsers(values);
    };

    const handleAddFields = () => {
        setUsers([...users, { username: '', fullname: '', password: '', confirmps: '', email: '', phone: '', sex: 'male', dateOfBirth: null }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...users];
        values.splice(index, 1);
        setUsers(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            users.forEach((user, index) => {
                formData.append(`users[${index}][username]`, user.username);
                formData.append(`users[${index}][fullname]`, user.fullname);
                formData.append(`users[${index}][password]`, user.password);
                formData.append(`users[${index}][confirmps]`, user.confirmps);
                formData.append(`users[${index}][email]`, user.email);
                formData.append(`users[${index}][phone]`, user.phone);
                formData.append(`users[${index}][sex]`, user.sex);
                formData.append(`users[${index}][dateOfBirth]`, format(new Date(user.dateOfBirth), 'yyyy-MM-dd'));
            });

            await RegisterMultiple(formData, accessToken);
            Swal.fire({
                icon: 'success',
                title: 'Users added successfully',
            });
            router.push('/dashboard/user');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: `${error.response.data.error}`,
            });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex item-center gap-4">
                <Link href={'/dashboard/user'} className="text-[#4b6cb7] text-3xl mb-5 font-bold hover:opacity-60 duration-300">User</Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <Link href={`/dashboard/user/new`} className="text-[#4b6cb7] text-3xl mb-5 hover:text-btn font-bold">New More</Link>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5 w-full h-full">
                {users.map((user, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <input type="text" name="fullname" placeholder="Full Name" value={user.fullname} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg" />
                        <select name="sex" value={user.sex} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="text" name="username" placeholder="User Name" value={user.username} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg" />
                        <input type="password" name="password" placeholder="Password" value={user.password} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg" />
                        <input type="password" name="confirmps" placeholder="Confirm Password" value={user.confirmps} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg" />
                        <input type="text" name="email" placeholder="Email" value={user.email} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg" />
                        <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={event => handleInputChange(index, event)} className="p-1.5 rounded-lg" />
                        <DatePicker selected={user.dateOfBirth} onChange={(date) => handleInputChange(index, { target: { name: 'dateOfBirth', value: date } })} placeholderText="Select Date Of Birth" className="p-1.5 rounded-lg w-full" />
                        <button type="button" onClick={() => handleRemoveFields(index)} className="text-white bg-red-500 hover:bg-red-700 py-1 rounded-md w-36 h-1/6">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddFields} className="text-white bg-[#4b6cb7] hover:bg-blue-900 py-1 rounded-md w-36 h-1/6">Add User</button>
                <button type="submit" className="text-white bg-[#4b6cb7] hover:bg-blue-900 py-1 rounded-md w-36 h-1/6">Save</button>
            </form>
        </div>
    );
};
 
export default MoreUser;