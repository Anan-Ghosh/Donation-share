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
            <div>
                <p></p>
                <TypeAnimation
                    sequence={[
                        "One", // Types 'One'
                        1000, // Waits 1s
                        "Two", // Deletes 'One' and types 'Two'
                        2000, // Waits 2s
                        "Two Three", // Types 'Three' without deleting 'Two'
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ fontSize: "2em", display: "inline-block" }}
                />
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
