import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const Navbar = ({ user }) => {
    const navigate = useNavigate();
    const user_parsed = JSON.parse(user);

    const handleLogout = () => {
        console.log("User logged out");
        localStorage.clear();
        navigate("/auth"); // Redirect to login page
    };

    return (
        <nav className="container mx-auto md:px-22 bg-[#18212d] text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl text-[#FF3008] font-bold cursor-pointer" onClick={() => navigate("/")}>
                    DonorPoint
                </h1>
                <div className="">
                    {/* Logout Button */}
                    <LuLogOut className="cursor-pointer" onClick={handleLogout} size={22} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
