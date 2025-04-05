import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { TypeAnimation } from "react-type-animation";

const AuthPage = () => {
    const [type, setType] = useState("login");

    const handleState = (data) => {
        setType(data);
    };

    return (
        <div className="grid grid-cols-2 auth-page">
            <div className="flex flex-col justify-center text-left items-center mb-30">
                <p className="text-5xl mb-4">Donate Today, Transform Tomorrow.</p>
                <p className="text-4xl text-left">
                    Be a{" "}
                    <TypeAnimation
                        sequence={["Giver.", 2000, "Provider.", 2000, "Change.", 2000, "Doner.", 2000]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        className="text-[#FF3008]"
                    />
                </p>
            </div>
            {type === "login" ? (
                <AuthForm type={"login"} handleState={handleState} />
            ) : (
                <AuthForm type={"register"} handleState={handleState} />
            )}
        </div>
    );
};

export default AuthPage;
