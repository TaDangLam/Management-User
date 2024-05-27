import NavbarProfile from "./components/NavbarProfile";

const DashboardProfileLayout = ({ children }) => {
    return ( 
        <div className="bg-gradient-to-b from-[#4b6cb7] to-[#1CB5E0] min-h-screen flex gap-2 w-min-full">
            <div className="w-1/6 pl-2 py-2"><NavbarProfile /></div>
            <div className="bg-slate-100 w-5/6 rounded-xl mr-2 my-2 p-4">{children}</div>
        </div>
    );
}
 
export default DashboardProfileLayout;
