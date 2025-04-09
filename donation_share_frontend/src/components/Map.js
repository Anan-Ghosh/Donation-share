import React, { useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const BeepingMarker = ({ donation }) => {
    const navigate = useNavigate();

    let title = donation.title;
    let location = JSON.parse(donation.location);
    let type = donation.type;
    let isBooked = donation.is_booked;
    let donationId = donation.donation_id;

    const markerRef = useRef();
    const availableDonationIcon = L.divIcon({
        className: "",
        html: `<div class="pulse"></div>`,
        iconSize: [10, 10],
        iconAnchor: [10, 10],
    });

    const bookedDonationIcon = L.divIcon({
        className: "",
        html: `<div class="booked_donation"></div>`,
        iconSize: [10, 10],
        iconAnchor: [10, 10],
    });

    const eventHandlers = {
        mouseover: () => {
            markerRef.current?.openPopup();
        },
        mouseout: () => {
            markerRef.current?.closePopup();
        },
        click: () => {
            navigate(`/donation/${donationId}`);
        },
    };

    return (
        <Marker
            position={location.location}
            icon={isBooked ? bookedDonationIcon : availableDonationIcon}
            ref={markerRef}
            eventHandlers={eventHandlers}
        >
            <Popup closeButton={false} autoPan={false}>
                <div className="flex flex-col">
                    <span>Title : {title}</span>
                    <span>Donation Type : {type}</span>
                    <span>Pickup Address : {location.address}</span>
                </div>
            </Popup>
        </Marker>
    );
};

const Map = ({ data }) => {
    return (
        <MapContainer
            center={[51.05, -114.07]}
            doubleClickZoom={false}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data && data.map((item) => <BeepingMarker donation={item} />)}
        </MapContainer>
    );
};

export default Map;
