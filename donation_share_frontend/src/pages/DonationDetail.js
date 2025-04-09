import React, { useEffect, useState } from "react";
import { MdBookmark } from "react-icons/md";
import RouteMap from "../components/RouteMap";
import { getData } from "../components/api_functions";
import * as turf from "@turf/turf";

const DonationDetail = () => {
    const [donation, setDonation] = useState();
    const [currentLocation, setCurrentLocation] = useState(null);

    const path = window.location.pathname.split("/");
    const donationId = path[path.length - 1];

    useEffect(() => {
        // Get Donation Data
        getData(`/donations/${donationId}`)
            .then((res) => setDonation(res))
            .catch((err) => console.log(err));

        // Current Location
        navigator.geolocation.watchPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => console.error(err),
        );
    }, []);

    const calculateDistance = () => {
        let pickupAddress = JSON.parse(donation.location).location;
        const point1 = turf.point([pickupAddress[1], pickupAddress[0]]); // e.g. [ -73.989, 40.733 ]
        const point2 = turf.point([currentLocation.lng, currentLocation.lat]); // e.g. [ -74.005, 40.712 ]

        const options = { units: "kilometers" }; // can also be 'miles', 'meters', etc.

        const distance = turf.distance(point1, point2, options);

        return distance.toFixed(2);
    };

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
                <div className="absolute bottom-[-20px] text-[#FF3008] text-sm font-bold">
                    {donation && currentLocation && calculateDistance()} Km
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-14">
                <div className="flex flex-col rounded-xl p-6 bg-[#18212d]">
                    <h2 className="text-white text-xl mb-4">Donation Detail</h2>
                    {donation && (
                        <div className="flex flex-col divide-y divide-y-slate-200 text-left text-[#526484]">
                            <div className="flex flex-row justify-between items-center py-4">
                                <p>Donor</p>
                                <p className="font-bold">{donation.donor}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center py-4">
                                <p>Donation type</p>
                                <p className="font-bold">{donation.type}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center py-4">
                                <p className="mr-4">Address</p>
                                <p className="font-bold text-xs text-right">{JSON.parse(donation.location).address}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center py-4">
                                <p>Pickup Time</p>
                                <p className="font-bold">{donation.pickup_time}</p>
                            </div>
                            <div className="flex flex-col py-4">
                                <p className="font-bold">Description and Instructions</p>
                                <p>{donation.description}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div id="map" className="col-span-3 rounded-xl overflow-hidden border border-[#18212d] w-full h-180">
                    {donation && (
                        <RouteMap
                            currentLocation={currentLocation}
                            pickupLocation={JSON.parse(donation.location).location}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default DonationDetail;
