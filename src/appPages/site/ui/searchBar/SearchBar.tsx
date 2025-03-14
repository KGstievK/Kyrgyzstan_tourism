"use client";

import React, { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";
import useTranslate from "@/appPages/site/hooks/translate/translate";

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
  setModalWindowTime?: (boolean: boolean) => void;
  fromMap?: boolean; // Флаг, указывающий, что компонент рендерится из Map компонента
  navigateToRoutes?: boolean; // Флаг для навигации на /routes при поиске
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
  setModalWindowTime,
  fromMap = false,
  navigateToRoutes = false,
}: SearchBarProps) {
  const router = useRouter();
  const { t } = useTranslate();
  
  // Состояния для хранения ошибок
  const [pointAError, setPointAError] = useState<string | null>(null);
  const [pointBError, setPointBError] = useState<string | null>(null);
  
  // Функция для навигации на страницу /routes с параметрами
  const navigateToRoutesPage = () => {
    if (!validateInputs()) return;
    
    if (!pointACoords || !pointBCoords) return;
    
    // Создаем URL с параметрами поиска
    const queryParams = new URLSearchParams({
      pointA: pointA,
      pointB: pointB,
      pointALat: pointACoords.lat.toString(),
      pointALng: pointACoords.lng.toString(),
      pointBLat: pointBCoords.lat.toString(),
      pointBLng: pointBCoords.lng.toString(),
    }).toString();
    
    router.push(`/routes?${queryParams}`);
  };
  
  // Функция для валидации полей ввода
  const validateInputs = () => {
    let isValid = true;
    
    // Сбрасываем предыдущие ошибки
    setPointAError(null);
    setPointBError(null);
    
    // Проверяем первое поле
    if (!pointA.trim()) {
      setPointAError(t("Укажите пункт отправления", "الرجاء تحديد نقطة المغادرة", "Please specify departure point"));
      isValid = false;
    }
    
    // Проверяем второе поле
    if (!pointB.trim()) {
      setPointBError(t("Укажите пункт назначения", "الرجاء تحديد الوجهة", "Please specify destination"));
      isValid = false;
    }
    
    return isValid;
  };
  
  // Функция-обертка для onSearch с валидацией
  const handleSearch = () => {
    if (!validateInputs()) return;
    
    onSearch();
    setModalWindowTime && setModalWindowTime(true);
  };
  
  // Создаем refs для хранения введенных пользователем значений
  const inputARef = React.useRef<HTMLInputElement>(null);
  const inputBRef = React.useRef<HTMLInputElement>(null);

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
      // Используем введенное пользователем значение
      const inputValue = inputARef.current?.value || pointA;
      
      setPointA(inputValue);
      setPointACoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      
      // Сбрасываем ошибку, если она была
      setPointAError(null);
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
      // Используем значение, введенное пользователем
      const inputValue = inputBRef.current?.value || pointB;
      
      setPointB(inputValue);
      setPointBCoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      
      // Сбрасываем ошибку, если она была
      setPointBError(null);
    } else {
      console.error("No geometry available for Point B:", place);
      setPointBCoords(null);
    }
  };

  // Обработчики для очистки ошибок при вводе
  const handlePointAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointA(e.target.value);
    if (e.target.value.trim()) {
      setPointAError(null);
    }
  };

  const handlePointBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointB(e.target.value);
    if (e.target.value.trim()) {
      setPointBError(null);
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <Autocomplete onLoad={onLoadA} onPlaceChanged={onPlaceChangedA}>
            <input
              ref={inputARef}
              type="text"
              value={pointA}
              onChange={handlePointAChange}
              placeholder={t("Откуда?", "من أين؟", "From where?")}
              className={`${styles.input} ${pointA ? styles.inputFocused : ""} ${pointAError ? styles.inputError : ""}`}
            />
          </Autocomplete>
          {pointAError && <div className={styles.errorMessage}>{pointAError}</div>}
        </div>
        
        <div className={styles.inputWrapper}>
          <Autocomplete onLoad={onLoadB} onPlaceChanged={onPlaceChangedB}>
            <input
              ref={inputBRef}
              type="text"
              value={pointB}
              onChange={handlePointBChange}
              placeholder={t("Куда?", "إلى أين؟", "Where to?")}
              className={`${styles.input} ${pointBError ? styles.inputError : ""}`}
            />
          </Autocomplete>
          {pointBError && <div className={styles.errorMessage}>{pointBError}</div>}
        </div>
        
        <button
          onClick={() => {
            if (fromMap && navigateToRoutes) {
              // Если компонент отображается на странице карты, и нужно перейти на страницу маршрутов
              navigateToRoutesPage();
            } else {
              // Если компонент уже находится на странице маршрутов
              handleSearch();
            }
          }}
          className={styles.btnGo}
        >
          {t("Поехали", "انطلق", "Go")}
        </button>
      </div>
    </div>
  );
}