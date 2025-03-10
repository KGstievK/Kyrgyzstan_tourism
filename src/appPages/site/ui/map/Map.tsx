import React from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import styles from "./Map.module.scss";

interface MapProps {
  directions: google.maps.DirectionsResult | null;
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 42.8746, // Бишкек
  lng: 74.5698,
};

export default function Map({ directions }: MapProps) {
  return (
    <div className={styles.map}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={7}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}