"use client";

import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  pointA: string;
  pointB: string;
  setPointA: (value: string) => void;
  setPointB: (value: string) => void;
  pointACoords: { lat: number; lng: number } | null;
  pointBCoords: { lat: number; lng: number } | null;
  setPointACoords: (coords: { lat: number; lng: number } | null) => void;
  setPointBCoords: (coords: { lat: number; lng: number } | null) => void;
  onSearch: () => void;
  autocompleteA: React.MutableRefObject<google.maps.places.Autocomplete | null>;
  autocompleteB: React.MutableRefObject<google.maps.places.Autocomplete | null>;
}

const kyrgyzstanBounds = {
  north: 43.265,
  south: 39.172,
  east: 80.226,
  west: 69.264,
};

export default function SearchBar({
  pointA,
  pointB,
  setPointA,
  setPointB,
  pointACoords,
  pointBCoords,
  setPointACoords,
  setPointBCoords,
  onSearch,
  autocompleteA,
  autocompleteB,
}: SearchBarProps) {
  const onLoadA = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteA.current = autocomplete;
    autocomplete.setBounds(kyrgyzstanBounds);
    autocomplete.setComponentRestrictions({ country: "kg" });
  };

  const onLoadB = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteB.current = autocomplete;
    autocomplete.setBounds(kyrgyzstanBounds);
    autocomplete.setComponentRestrictions({ country: "kg" });
  };

  const onPlaceChangedA = () => {
    if (!autocompleteA.current) {
      console.error("Autocomplete A is not initialized");
      return;
    }

    const place = autocompleteA.current.getPlace();
    if (!place) {
      console.error("No place selected for Point A");
      setPointACoords(null);
      return;
    }

    if (place.geometry && place.geometry.location) {
      setPointA(place.formatted_address || "");
      setPointACoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.error("No geometry available for Point A:", place);
      setPointACoords(null);
    }
  };

  const onPlaceChangedB = () => {
    if (!autocompleteB.current) {
      console.error("Autocomplete B is not initialized");
      return;
    }

    const place = autocompleteB.current.getPlace();
    if (!place) {
      console.error("No place selected for Point B");
      setPointBCoords(null);
      return;
    }

    if (place.geometry && place.geometry.location) {
      setPointB(place.formatted_address || "");
      setPointBCoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    } else {
      console.error("No geometry available for Point B:", place);
      setPointBCoords(null);
    }
  };

  return (
    <div className={styles.searchBar}>
      <h2 className={styles.searchTitle}>• Where to go</h2>
      <div className={styles.searchContainer}>
        <Autocomplete onLoad={onLoadA} onPlaceChanged={onPlaceChangedA}>
          <input
            type="text"
            value={pointA}
            onChange={(e) => setPointA(e.target.value)}
            placeholder="Where?"
            className={`${styles.input} ${pointA ? styles.inputFocused : ""}`}
          />
        </Autocomplete>
        <Autocomplete onLoad={onLoadB} onPlaceChanged={onPlaceChangedB}>
          <input
            type="text"
            value={pointB}
            onChange={(e) => setPointB(e.target.value)}
            placeholder="Where?"
            className={styles.input}
          />
        </Autocomplete>
        <button onClick={onSearch} className={styles.btnGo}>
          Go
        </button>
      </div>
    </div>
  );
}