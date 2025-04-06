import React from "react";

const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
];

function getColorFromName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

const Provider = ({ name, email, donationNo }) => {
    const initial = name ? name.charAt(0).toUpperCase() : "?";
    const bgColor = getColorFromName(name);
    return (
        <div className="flex flex-row pb-4 my-4 text-white justify-between items-center">
            <div className="flex flex-row">
                <div
                    className={`flex items-center justify-center rounded-full h-12 w-12 ${bgColor} text-white font-semibold text-md`}
                >
                    {initial}
                </div>
                <div className="flex flex-col ml-4">
                    <p className="text-xl">{name}</p>
                    <span className="text-sm text-slate-400">{email}</span>
                </div>
            </div>
            <div className="">
                <p>
                    <strong className="text-3xl text-[#FF3008]">{donationNo} </strong> donations
                </p>
            </div>
        </div>
    );
};

export default Provider;
