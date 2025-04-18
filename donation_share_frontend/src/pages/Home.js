import React, { useEffect, useState } from "react";
import DataCard from "../components/DataCard";
import Provider from "../components/Provider";

import { FaPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import Map from "../components/Map";
import DonationForm from "../components/DonationForm";
import { getData } from "../components/api_functions";
import ReceiverTable from "../components/ReceiverTable";
import SignificanceTable from "../components/SignificanceTable";

const Home = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [donations, setDonation] = useState([]);
    const [userData, setUserData] = useState(0);
    const [beneficiaryData, setBeneficiaryData] = useState(0);
    const [userActivity, setUserActivity] = useState([]);
    const [topDonors, setTopDonors] = useState([]);
    const [highDemand, setHighDemand] = useState();
    let user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);

    useEffect(() => {
        getData("/donations")
            .then((res) => setDonation(res))
            .catch((err) => console.log(err));
        getData("/users")
            .then((res) => setUserData(res))
            .catch((err) => console.log(err));
        getData("/receivers")
            .then((res) => setBeneficiaryData(res))
            .catch((err) => console.log(err));
        getData(`/user_activity/${user_parsed.email}`)
            .then((res) => setUserActivity(res))
            .catch((err) => console.log(err));
        getData("/top_donors")
            .then((res) => setTopDonors(res))
            .catch((err) => console.log(err));
        getData("/analyze_quadrants")
            .then((res) => setHighDemand(JSON.parse(res.result)))
            .catch((err) => console.log(err));
    }, []);

    const scrollToMap = () => {
        window.scroll({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    console.log(highDemand);

    return (
        <div className="container mx-auto md:px-22 my-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col mb-8 md:mb-0">
                    <h2 className="text-white text-3xl">Welcome {user_parsed.username.split(" ")[0]}</h2>
                    <span className="mt-1 text-[#526484]">Welcome to your donation dashboard</span>
                </div>
                <div classname="">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="cursor-pointer rounded bg-[#18212d] px-6 p-1 text-[#526484] hover:bg-white hover:text-black transition mx-5 border border-[#526484]"
                    >
                        <div className="flex flex-row items-center ">
                            <FaPlus /> <span className="ml-2">Donate</span>
                        </div>
                    </button>
                    <button
                        onClick={() => scrollToMap()}
                        className="cursor-pointer rounded bg-[#FF3008] px-6 p-1 text-white"
                    >
                        <span>Beneficiary</span>{" "}
                    </button>
                </div>
            </div>
            <DonationForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} donor={user_parsed.email} />
            <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-4 my-14">
                <DataCard number={donations ? donations.length : 0} title={"Number of Donations"} color={"#09c2de"}>
                    {" "}
                    <FaHandHoldingHeart size={85} className="relative top-1 left-0" />
                </DataCard>
                <DataCard number={userData} title={"Total Users"} color={"#e85347"}>
                    <MdAccountCircle size={85} className="relative top-5 left-5" />
                </DataCard>
                <DataCard number={beneficiaryData} title={"Number of Beneficiaries"} color={"#1ee0ac"}>
                    {" "}
                    <FaSmile size={85} className="relative top-5 left-5" />
                </DataCard>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <ReceiverTable data={userActivity} user={user_parsed.email} />
                </div>
                <div className="flex flex-col rounded-xl p-6 bg-[#18212d]">
                    <h2 className="text-white text-xl mb-4">Top Providers</h2>
                    <div className="flex flex-col divide-y divide-[#526484]">
                        {topDonors.map((item) => (
                            <Provider name={item.username} email={item.email} donationNo={item.donation_count} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="my-6">{highDemand && <SignificanceTable data={highDemand} />}</div>
            <div id="map" className="mt-12 rounded-xl overflow-hidden border border-[#18212d] w-full h-180">
                {donations.length > 0 && <Map data={donations} />}
            </div>
        </div>
    );
};

export default Home;
