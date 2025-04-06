import React from "react";
import DataCard from "../components/DataCard";
import Provider from "../components/Provider";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";

const Home = () => {
    return (
        <div className="container mx-auto px-22 my-12">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col ">
                    <h2 className="text-white text-3xl">Welcome Name</h2>
                    <span className="mt-1 text-[#526484]">Welcome to your donation dashboard</span>
                </div>
                <div classname="">
                    <button className="cursor-pointer rounded bg-[#18212d] px-6 p-1 text-[#526484] hover:bg-white hover:text-black transition mx-5 border border-[#526484]">
                        <div className="flex flex-row items-center ">
                            <FaPlus /> <span className="ml-2">Donate</span>
                        </div>
                    </button>
                    <button className="cursor-pointer rounded bg-[#FF3008] px-6 p-1 text-white">
                        <span>Beneficiary</span>{" "}
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center my-14">
                <DataCard number={56} title={"Number of Donations"} color={"#09c2de"}>
                    {" "}
                    <FaHandHoldingHeart size={85} className="relative top-1 left-0" />
                </DataCard>
                <DataCard number={56} title={"Total Users"} color={"#e85347"}>
                    <MdAccountCircle size={85} className="relative top-5 left-5" />
                </DataCard>
                <DataCard number={56} title={"Average Rating"} color={"#f4bd0e"}>
                    <FaStar size={85} className="relative top-5 left-5" />
                </DataCard>
                <DataCard number={56} title={"Number of Beneficiaries"} color={"#1ee0ac"}>
                    {" "}
                    <FaSmile size={85} className="relative top-5 left-5" />
                </DataCard>
            </div>
            <div className="grid grid-cols-3">
                <div></div>
                <div className="flex flex-col rounded-xl p-6 bg-[#18212d]">
                    <h2 className="text-white text-xl mb-4">Top Providers</h2>
                    <div className="flex flex-col divide-y divide-[#526484]">
                        <Provider name={"Alicia"} email={"alicia@gmail.com"} donationNo={5} />
                        <Provider name={"Darlee"} email={"alicia@gmail.com"} donationNo={5} />
                        <Provider name={"Shahnila"} email={"alicia@gmail.com"} donationNo={5} />
                        <Provider name={"Mandy"} email={"alicia@gmail.com"} donationNo={5} />
                        <Provider name={"Audri"} email={"alicia@gmail.com"} donationNo={5} />
                    </div>
                </div>
            </div>
            <div className="mt-12 rounded-xl overflow-hidden border border-[#18212d] w-full h-180">
                <MapContainer center={[51.05, -114.07]} zoom={11} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[51.05, -114.07]}>
                        <Popup></Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default Home;
