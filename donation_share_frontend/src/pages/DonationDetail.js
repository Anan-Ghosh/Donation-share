import React from "react";
import { MdBookmark } from "react-icons/md";
import RouteMap from "../components/RouteMap";

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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-14">
                <div className="flex flex-col rounded-xl p-6 bg-[#18212d]">
                    <h2 className="text-white text-xl mb-4">Donation Detail</h2>
                    <div className="flex flex-col divide-y divide-y-slate-200 text-left text-[#526484]">
                        <div className="flex flex-row justify-between items-center py-4">
                            <p>Donor</p>
                            <p className="font-bold">Ashraful Hassan</p>
                        </div>
                        <div className="flex flex-row justify-between items-center py-4">
                            <p>Donation type</p>
                            <p className="font-bold">Clothin</p>
                        </div>
                        <div className="flex flex-row justify-between items-center py-4">
                            <p>Location</p>
                            <p className="font-bold">4501 37th Street NW</p>
                        </div>
                        <div className="flex flex-row justify-between items-center py-4">
                            <p>Pickup Time</p>
                            <p className="font-bold">0300</p>
                        </div>
                        <div className="flex flex-col py-4">
                            <p className="font-bold">Description and Instructions</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida nunc nec orci
                                laoreet egestas. Vivamus dignissim velit a mauris rhoncus vehicula. Vestibulum in
                                laoreet quam. Praesent faucibus purus aliquet urna ornare, eget mattis justo pretium.
                                Nulla a libero vitae justo vestibulum elementum. Praesent dictum ex id efficitur
                                fringilla. Sed rhoncus auctor erat, sit amet lobortis nulla bibendum sit amet. Mauris
                                euismod, nisl ac mollis consectetur, orci nisi tempus metus, sit amet suscipit orci nisi
                                id augue.
                            </p>
                        </div>
                    </div>
                </div>

                <div id="map" className="col-span-3 rounded-xl overflow-hidden border border-[#18212d] w-full h-180">
                    <RouteMap />
                </div>
            </div>
        </div>
    );
};
export default DonationDetail;
