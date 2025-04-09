import React from "react";

const SignificanceTable = ({ data }) => {
    return (
        <div className="bg-[#18212d] p-6 rounded-2xl shadow-lg w-full">
            <h2 className="text-white text-xl mb-4">Analysis by quadrants</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="text-left text-white">
                        <th className="px-4 py-2 w-1/3">Rank</th>
                        <th className="px-4 py-2 w-1/3">Quadrant</th>
                        <th className="px-4 py-2 w-1/3">Donation Count</th>
                        <th className="px-4 py-2 w-1/3">Demand Index</th>
                    </tr>
                </thead>
                <tbody>
                    {data.rank_by_count.map((items, index) => (
                        <tr key={index} className="text-slate-400 my-8 border-b-2 border-slate-700">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{items}</td>
                            <td className="px-4 py-2">{data.counts[items]}</td>
                            <td className="px-4 py-2">{data.significance[items]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SignificanceTable;
