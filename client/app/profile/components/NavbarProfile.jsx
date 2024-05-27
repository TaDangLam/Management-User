'use client'
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Logout } from "@/app/api/route";

const NavbarProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = async() => {
        router.push('/');
        Logout(dispatch);
    }

    return ( 
        <div className="flex flex-col bg-slate-200 h-[120px] shadow-2xl rounded-[25px] w-full">
            <div className="flex items-center gap-2 pl-3.5 text-blue-900 bg-slate-100 font-bold cursor-pointer duration-300 w-full rounded-t-[25px] h-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                <span>Profile</span>
            </div>
            <div className="flex items-center gap-2 pl-3.5 text-blue-900 hover:bg-[#3889c7] hover:text-slate-100  font-bold cursor-pointer duration-300 w-full rounded-b-[25px] h-1/2" onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
                <span>Logout</span>
            </div>
        </div>
    );
}
 
export default NavbarProfile;