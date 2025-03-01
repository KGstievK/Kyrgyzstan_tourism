import React from "react";
import styles from "./Route.module.scss";
import { BsPersonWalking } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { IoSubway } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { FetchBaseQueryError, SerializedError } from "@reduxjs/toolkit/query";

interface RouteInfoProps {
  walkData?: { distance: string; duration: string };
  walkError?: FetchBaseQueryError | SerializedError;
  carData?: { distance: string; duration: string };
  carError?: FetchBaseQueryError | SerializedError;
  trainData?: { distance: string; duration: string };
  trainError?: FetchBaseQueryError | SerializedError;
  isSearched: boolean;
}

export default function RouteInfo({
  walkData,
  walkError,
  carData,
  carError,
  trainData,
  trainError,
  isSearched,
}: RouteInfoProps) {
  const getErrorText = (error?: FetchBaseQueryError | SerializedError) => {
    if (!error) return "N/A";
    if ("status" in error) {
      return `${error.status}: ${typeof error.data === "string" ? error.data : "Error"}`;
    }
    return "Error";
  };

  return (
    <div className={styles.routeInfo}>
      <div className={styles.routeItem}>
        <TiLocation className={styles.icon} />
        <p>{isSearched ? (walkData?.distance || getErrorText(walkError)) : "-"}</p>
      </div>
      <div className={styles.routeItem}>
        <BsPersonWalking className={styles.icon} />
        <p>{isSearched ? (walkData?.duration || getErrorText(walkError)) : "-"}</p>
      </div>
      <div className={styles.routeItem}>
        <FaCar className={styles.icon} />
        <p>{isSearched ? (carData?.duration || getErrorText(carError)) : "-"}</p>
      </div>
      <div className={styles.routeItem}>
        <IoSubway className={styles.icon} />
        <p>{isSearched ? (trainData?.duration || getErrorText(trainError)) : "-"}</p>
      </div>
    </div>
  );
}