import React, { useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const BeepingMarker = ({ position }) => {
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
    };

    return (
        <Marker position={position} icon={bookedDonationIcon} ref={markerRef} eventHandlers={eventHandlers}>
            <Popup closeButton={false} autoPan={false}>
                This is Popup
            </Popup>
        </Marker>
    );
};

const Map = () => {
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
            <BeepingMarker position={[51.05, -114.07]} />
        </MapContainer>
    );
};

export default Map;
