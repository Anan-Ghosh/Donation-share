import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
    const navigate = useNavigate();
    const user_parsed = JSON.parse(user);

    const handleLogout = () => {
        console.log("User logged out");
        localStorage.clear();
        navigate("/auth"); // Redirect to login page
    };

    return (
        <nav className="bg-slate-800 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                    Home
                </h1>
                <div className="">
                    <span className="text-sm pr-5">Hello, {user_parsed.username}</span>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer outline border-white px-2 py-1 rounded-lg hover:bg-slate-900 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
