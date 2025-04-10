import React from "react";
import { postData } from "./api_functions";
import { toast } from "react-toastify";

const ReceiverTable = ({ data, user }) => {
    const handleClick = (donation_id) => {
        postData(`/complete/${donation_id}`, { receiver: user })
            .then((res) => {
                toast("Successfuly picked up donation");
            })
            .catch((err) => toast.error("Error in completing donation"));
    };

    return (
        <div className="bg-[#18212d] p-6 rounded-2xl shadow-lg h-[600px] w-full">
            <h2 className="text-white text-xl mb-4">Your Activity</h2>
            {data.length > 0 ? (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="text-left text-white">
                            <th className=" px-4 py-2 w-1/3">Donation ID</th>
                            <th className=" px-4 py-2 w-1/3">Status</th>
                            <th className=" px-4 py-2 w-1/3">Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className="text-slate-400 my-8 border-b-2 border-slate-700">
                                <td className=" px-4 py-2">{row.donation_id}</td>
                                <td className=" px-4 py-2">{row.is_completed ? "Completed" : "Booked"}</td>
                                <td className="">
                                    {row.is_completed ? (
                                        "No Pending Tasks"
                                    ) : (
                                        <div className="flex flex-row">
                                            <button
                                                onClick={() => handleClick(row.donation_id)}
                                                className="bg-[#FF3008] cursor-pointer text-white px-4 py-1 mx-2 rounded-xs text-xs"
                                            >
                                                Completed
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-left text-white m-8">No data to show at the moment</p>
            )}
        </div>
    );
};

export default ReceiverTable;
