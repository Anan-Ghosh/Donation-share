import React, { useState } from "react";
import { postData } from "./api_functions";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthForm = ({ type, handleState }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        ...(type === "register" && { name: "" }),
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clearForm = () => {
        setFormData({
            email: "",
            password: "",
            ...(type === "register" && { name: "" }),
        });
    };

    const onSubmit = (e, data) => {
        e.preventDefault();
        if (type === "login") {
            postData("/login", data)
                .then((res) => {
                    toast("You have successfully logged in", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    localStorage.setItem("user", JSON.stringify(res.user));
                    // Redirect user
                    navigate("/", { replace: true });
                })
                .catch((err) => console.log("Error:", err));
        } else {
            postData("/register", data)
                .then((res) =>
                    toast("You have successfully registered", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }),
                )
                .catch((err) => console.log("Error:", err));
        }
        clearForm();
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="p-6 px-12 rounded-xl shadow-lg shadow-slate-700/10 w-106 bg-black text-white">
                <h2 className="text-2xl font-bold text-center mb-4">{type === "login" ? "Login" : "Register"}</h2>
                <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4">
                    {type === "register" && (
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF3008] cursor-pointer text-white py-2 rounded hover:bg-orange-700"
                    >
                        {type === "login" ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    {type === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <span onClick={() => handleState("register")} className="text-[#FF3008] cursor-pointer">
                                Register
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span onClick={() => handleState("login")} className="text-[#FF3008] cursor-pointer">
                                Login
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
