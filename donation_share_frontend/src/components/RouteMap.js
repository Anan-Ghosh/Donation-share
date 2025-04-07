import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const Routing = ({ currentLocation, destination }) => {
    const map = useMap();
    const controlRef = useRef(null);

    useEffect(() => {
        if (!map || !currentLocation || !destination) return;

        const { lat: lat1, lng: lng1 } = currentLocation;
        const { lat: lat2, lng: lng2 } = destination;

        // Remove previous route safely
        if (controlRef.current) {
            try {
                controlRef.current.remove();
                controlRef.current = null;
            } catch (err) {
                console.warn("Error removing control:", err);
            }
        }

        const control = L.Routing.control({
            waypoints: [L.latLng(lat1, lng1), L.latLng(lat2, lng2)],
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            createMarker: () => null, // hide markers
            show: false, // hide instructions
        });

        control.addTo(map);
        controlRef.current = control;

        return () => {
            try {
                if (controlRef.current) {
                    controlRef.current.remove();
                    controlRef.current = null;
                }
            } catch (err) {
                console.warn("Cleanup error:", err);
            }
        };
    }, [currentLocation.lat, currentLocation.lng, destination.lat, destination.lng]);

    return null;
};

const RouteMap = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    // Set your desired destination
    const destination = {
        lat: 53.5461, // Example: Edmonton
        lng: -113.4938,
    };

    useEffect(() => {
        navigator.geolocation.watchPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => console.error(err),
            { enableHighAccuracy: true },
        );
    }, []);

    const availableDonationIcon = L.divIcon({
        className: "",
        html: `<div class="pulse"></div>`,
        iconSize: [10, 10],
        iconAnchor: [10, 10],
    });

    return currentLocation ? (
        <MapContainer center={currentLocation} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentLocation} icon={availableDonationIcon} />
            <Routing currentLocation={currentLocation} destination={destination} />
        </MapContainer>
    ) : (
        <p>Getting location...</p>
    );
};

export default RouteMap;
