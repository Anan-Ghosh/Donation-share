import React, { useState } from "react";
import Modal from "react-modal";
import { postData, toastConfig } from "./api_functions";
import { toast } from "react-toastify";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        zIndex: 40,
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        background: "#18212d",
        borderRadius: "15px",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
};

let initial_form = {
    title: "",
    location: "",
    type: "",
    pickupTime: "",
    description: "",
};

const DonationForm = ({ modalIsOpen, setIsOpen, donor }) => {
    const [formData, setFormData] = useState(initial_form);

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formData, donor: donor };
        console.log(data);
        postData("/donations", data)
            .then((res) => toast("Donation request added successfully", toastConfig))
            .catch((err) => {
                toast.error("Donation request error", toastConfig);
            });
        setFormData(initial_form);
        closeModal();
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} transparent={true}>
            <h3 className="text-xl text-white font-bold ml-6">Add a donation request</h3>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 text-white md:grid-cols-2 gap-4 p-6 bg-[#18212d] rounded-xl shadow-md max-w-3xl mx-auto"
            >
                {/* Title */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                    <label htmlFor="location" className="font-medium mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Type */}
                <div className="flex flex-col">
                    <label htmlFor="type" className="font-medium mb-1">
                        Type
                    </label>
                    <input
                        type="text"
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Pickup Time */}
                <div className="flex flex-col">
                    <label htmlFor="pickupTime" className="font-medium mb-1">
                        Pickup Time
                    </label>
                    <input
                        type="datetime-local"
                        name="pickupTime"
                        id="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description (full width) */}
                <div className="flex flex-col col-span-1 md:col-span-2">
                    <label htmlFor="description" className="font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Submit Button (full width) */}
                <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button type="submit" className="bg-[#FF3008] cursor-pointer text-white px-4 py-2 rounded-lg">
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default DonationForm;
