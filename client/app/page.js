'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Swal from "sweetalert2";

import { Login, getAllUser, getDetailUser } from "./api/route";

export default function Home() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const router = useRouter();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('username', username);
      bodyFormData.append('password', password);

      const data = await Login(bodyFormData);
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
          title: "Login in successfully"
        });
      checkRole(data);
    } catch (error) {
        console.error('Login error:', error);
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
            title: `${error}`
          });
    }
  }

  const checkRole = (role) => {
    if(role === 'admin'){
        router.push('/dashboard');
    }else{
        router.push('/customer');
    }
  }

  // useEffect(() => {
  //   getAllProductForAdmin();
  // }, []);

  // const getAllProductForAdmin = async() => {
  //   try {
  //     const data = await getDetailUser('66471079dcad52bb1afef26b','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjY0YWIyNzIyNWJmN2I3NTcxM2M0OTdmIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNjI1NTYyMiwiZXhwIjoxNzE3OTgzNjIyfQ.pOn8gKzKqJIl-0ZfT63ijnmME3fMpewBq0VhEoqy4Mw');
  //     setUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // console.log(user)
  return (
    <div className="flex items-center justify-center h-screen ">
        <div className="flex flex-col bg-slate-200 h-3/6 w-3/6 shadow-login rounded-[25px]">
            <div className="flex flex-col w-full h-5/6 rounded-t-[25px] p-5">
                <div className="flex text-5xl font-bold items-center justify-center text-[#005AA7]">Login</div>
                <div className="flex items-center justify-center text-[#005AA7]">---------------------------</div>
                <form onSubmit={handleLogin} className="my-5 flex flex-col items-center gap-4">
                  <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                      <AiOutlineMail className="w-1/12"/>
                      <input 
                          type="text" 
                          placeholder="Username" 
                          className="w-full bg-slate-100 outline-none"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                      />
                  </label>
                  <label className="flex items-center gap-2 w-72 p-3 bg-slate-100">
                      <AiOutlineLock className="w-1/12"/>
                      <input 
                          type="password" 
                          placeholder="Password" 
                          className="w-full bg-slate-100 outline-none"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </label>
                  <div className="flex w-72 items-center justify-between">
                      <Link href={'/auth/signin'} className="hover:text-[#005AA7] hover:opacity-75 duration-300">Sign in</Link>
                      <Link href={'/auth/forgotPassword'} className="hover:text-[#005AA7] hover:opacity-75 duration-300">Forgot Password</Link>
                  </div>
                  <button type="submit" className="flex item-center justify-center bg-[#005AA7] text-white w-36 rounded-full my-3 p-3 hover:opacity-75 duration-300">
                      Sign In
                  </button>
                </form>
            </div>
        </div>
    </div>
  );
}