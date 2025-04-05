import React from "react";

const DataCard = ({ number, title, color }) => {
    return (
        <div className="p-8 w-72 h-60 text-white flex flex-col">
            <p className="text-xl">{number}</p>
            <p>{title}</p>
        </div>
    );
};

export default DataCard;
