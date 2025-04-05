import React from "react";
import DataCard from "../components/DataCard";
import Provider from "../components/Provider";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Home = () => {
    return (
        <div className="container my-12">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h2>Welcome Name</h2>
                    <span>Welcome to your donation dashboard</span>
                </div>
                <div classname="flex flex-row">
                    <button> + Donate</button>
                    <button>Beneficiary </button>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <DataCard number={56} title={"Number of Donations"} color={"#09c2de"} />
                <DataCard number={56} title={"Total Users"} color={"#e85347"} />
                <DataCard number={56} title={"Average Rating"} color={"#f4bd0e"} />
                <DataCard number={56} title={"Number of Beneficiaries"} color={"#1ee0ac"} />
            </div>
            <div className="grid grid-cols-3">
                <div></div>
                <div className="flex flex-col rounded">
                    <h2>Top Providers</h2>
                    <div className="flex flex-col">
                        <Provider name={"Alicia"} donationNo={5} />
                        <Provider name={"Alicia"} donationNo={5} />
                        <Provider name={"Alicia"} donationNo={5} />
                        <Provider name={"Alicia"} donationNo={5} />
                        <Provider name={"Alicia"} donationNo={5} />
                    </div>
                </div>
            </div>
            <div className="">
                <MapContainer center={[51.05, -114.07]} zoom={11} style={{ height: "700px", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={location}>
                        <Popup></Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default Home;
