'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useDispatch } from "react-redux";

import { Logout } from "@/app/api/route";
import { useRouter } from "next/navigation";

const NavbarDashboard = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const inactiveLink = 'flex items-center gap-2 rounded-l-xl pl-3.5 hover:bg-slate-100 hover:text-blue-900 font-semibold cursor-pointer duration-300'
    const active = inactiveLink + ' bg-slate-100 text-blue-900 rounded-l-pd';
    
    const handleLogout = async() => {
        await Logout(dispatch);
        router.push('/')
    }
    // console.log(user)
    return (
        <div className="text-white p-4 pr-0 flex flex-col gap-4 ">
            <div className="flex flex-col gap-3 font-bold justify-center items-center">
                <Link href={'/dashboard/profiledashboard'} className="bg-blue-200 w-2/6 rounded-full">
                    {user.avatar ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_IMAGES}/${user._id}/${user.avatar}`}
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : user.sex === 'male' ? (
                        <img
                            src='/images.png'
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <img
                            src='/female.png'
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) }
                </Link>
                <div className="flex flex-col items-center justify-center">
                    <div>{user.fullname}</div>
                    <div className=" font-normal">{user.email}</div>
                </div>
            </div>
                
            <nav className="flex flex-col gap-3 ">
                <Link href={'/dashboard'} className={pathname === '/dashboard' ? active : inactiveLink}>
                    <svg className="w-6 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="">Dashboard</span>
                </Link>
                <Link href={'/dashboard/user'} className={pathname.includes('/dashboard/user') ? active : inactiveLink}>
                    <svg className="w-6 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <span>User</span>
                </Link>
                <div  className={`${inactiveLink}`} onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>

                    <span>Logout</span>
                </div>
            </nav>
        </div>
     );
}
 
export default NavbarDashboard;