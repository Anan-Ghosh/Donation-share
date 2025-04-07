import React from "react";
import { MdBookmark } from "react-icons/md";

const DonationDetail = () => {
    return (
        <div className="container mx-auto md:px-22 my-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col mb-8 md:mb-0">
                    <h2 className="text-white text-3xl">Donation Details</h2>
                    <span className="mt-1 text-[#526484]">Details for the donations presented below</span>
                </div>
                <div classname="">
                    <button className="cursor-pointer rounded bg-[#18212d] px-6 p-1 text-[#526484] hover:bg-white hover:text-black transition mx-5 border border-[#526484]">
                        <div className="flex flex-row items-center ">
                            <MdBookmark /> <span className="ml-2">Book</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="relative w-full flex justify-center items-center py-10">
                <div className="absolute left-0 w-6 h-6 bg-[#FF3008] rounded-full flex items-center justify-center text-white"></div>
                <div className="w-full h-1 bg-[#FF3008]"></div>
                <div className="absolute right-0 w-6 h-6 bg-[#FF3008] rounded-full flex items-center justify-center text-white"></div>
                <div className="absolute left-0 bottom-[-20px] text-[#FF3008] text-sm">Your location</div>
                <div className="absolute right-0 bottom-[-20px] text-[#FF3008] text-sm">Pickup Location</div>
                <div className="absolute bottom-[-20px] text-[#FF3008] text-sm">Distance Km</div>
            </div>
        </div>
    );
};
export default DonationDetail;
