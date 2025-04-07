import React from "react";

const DataCard = ({ number, title, color, children }) => {
    return (
        <div
            className={`p-8 w-72 rounded-xl relative overflow-hidden h-40 text-white font-bold flex flex-col bg-[${color}]`}
        >
            <p className="text-4xl mb-2">{number}</p>
            <p>{title}</p>
            <div className="absolute bottom-0 right-0">{children}</div>
        </div>
    );
};

export default DataCard;
