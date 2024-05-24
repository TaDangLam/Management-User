'use client'
import Link from "next/link";
import { useState } from "react";


const NewUser = () => {

    const saveForm = async(e) => {
        e.preventDefault();
    }

    const [loading, setLoading] = useState(false);
    return ( 
        <div>
        {loading ? (
            <div className="text-center py-40">
            Loading......
            </div>
        ) : (
            <div className="flex flex-col gap-2">
                <div className="flex item-center gap-4">
                    <Link href={'/dashboard/user'} className="text-[#4b6cb7] text-3xl mb-5 font-bold">User</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="flex item-center justify-center w-6 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                    <Link href={`/dashboard/user/new`} className="text-[#4b6cb7] text-3xl mb-5 hover:text-btn font-bold">New</Link>
                </div>
                <form onSubmit={saveForm} encType="multipart/form-data" className="flex flex-col gap-8 w-full h-full">
                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" htmlFor="ProductName">
                            Full Name
                        </label>
                        <input
                            id="user"
                            type="text"
                            placeholder="Please enter full name...."
                            className="p-1.5 rounded-lg"
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                        />
                    </div>
            
            
                    <div className=" flex flex-col w-full h-1/6">
                        <label className="text-[#4b6cb7] font-semibold" htmlFor="ProductName">
                            User Name
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Please enter user name...."
                            className="p-1.5 rounded-lg"
                            // value={desc}
                            // onChange={(e) => setDesc(e.target.value)}
                        >
                        </input>
                    </div>


                    {/* <div className="flex  gap-4  w-full h-1/6">
                        <label
                            // onChange={handleImageChange}
                            className="border w-32 h-32 text-center flex items-center justify-center rounded-lg bg-gray-200 cursor-pointer text-[#4b6cb7] hover:bg-[#4b6cb7] duration-500 hover:text-white"
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
                            <div>Upload</div>
                            <input type="file" className="hidden" multiple />
                        </label>
                        {!!images && images.length > 0 && (
                            <div className="flex items-center">
                                You Have {images.length} photos
                            </div>
                        )}

                    </div> */}
            
            
                    <div className="flex flex-col gap-2 w-full h-1/6">

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