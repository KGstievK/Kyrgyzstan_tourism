"use client";
import React, { useEffect, useRef, useState } from "react";
import scss from "./Routes.module.scss";
import Talas from "../../../../../assets/images/routesImages/Talas.png";
import Chui from "../../../../../assets/images/routesImages/Chui.png";
import Kyl from "../../../../../assets/images/routesImages/kyl.png";
import JalalAbad from "../../../../../assets/images/routesImages/JalalAbad.png";
import Naryn from "../../../../../assets/images/routesImages/Naryn.png";
import Osh from "../../../../../assets/images/routesImages/Osh.png";
import Batken from "../../../../../assets/images/routesImages/Batken.png";
import "react-datepicker/dist/react-datepicker.css";
import AirlineList from "./airLineModal/AirLineModal";
import { useGetDirectionsQuery } from "@/redux/googleMapsApi";
import SearchBar from "@/appPages/site/ui/searchBar/SearchBar";
import RouteInfo from "@/appPages/site/ui/route/Route";
import Map from "@/appPages/site/ui/map/Map";
import NavMap from "../regionSections/navMap/NavMap";
import { useSearchParams } from "next/navigation";
import useTranslate from "@/appPages/site/hooks/translate/translate";

const Routes = () => {
  const searchParams = useSearchParams();
  const [modalWindowTime, setModalWindowTime] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const {t} = useTranslate()
  // Инициализируем состояние с параметрами из URL, если они есть
  const [pointA, setPointA] = useState(searchParams?.get("pointA") || "");
  const [pointB, setPointB] = useState(searchParams?.get("pointB") || "");
  const [pointACoords, setPointACoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pointBCoords, setPointBCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [isSearched, setIsSearched] = useState(false);

  // Флаг для отслеживания первого рендера
  const isFirstRender = useRef(true);

  const autocompleteA = useRef<google.maps.places.Autocomplete | null>(null);
  const autocompleteB = useRef<google.maps.places.Autocomplete | null>(null);

  // Инициализируем координаты из параметров URL
  useEffect(() => {
    if (searchParams) {
      const pointALat = searchParams.get("pointALat");
      const pointALng = searchParams.get("pointALng");
      const pointBLat = searchParams.get("pointBLat");
      const pointBLng = searchParams.get("pointBLng");

      if (pointALat && pointALng) {
        setPointACoords({
          lat: parseFloat(pointALat),
          lng: parseFloat(pointALng),
        });
      }

      if (pointBLat && pointBLng) {
        setPointBCoords({
          lat: parseFloat(pointBLat),
          lng: parseFloat(pointBLng),
        });
      }

      // Если есть параметры в URL, автоматически показываем маршрут
      if (pointALat && pointALng && pointBLat && pointBLng) {
        setModalWindowTime(true);
      }
    }
  }, [searchParams]);

  // Запросы для разных видов транспорта с параметром skip, который предотвращает автоматический запуск
  const {
    data: walkData,
    error: walkError,
    refetch: refetchWalk,
  } = useGetDirectionsQuery(
    pointACoords && pointBCoords
      ? { origin: pointACoords, destination: pointBCoords, mode: "WALKING" }
      : ({} as any),
    {
      skip: !pointACoords || !pointBCoords,
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: carData,
    error: carError,
    refetch: refetchCar,
  } = useGetDirectionsQuery(
    pointACoords && pointBCoords
      ? { origin: pointACoords, destination: pointBCoords, mode: "DRIVING" }
      : ({} as any),
    {
      skip: !pointACoords || !pointBCoords,
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: trainData,
    error: trainError,
    refetch: refetchTrain,
  } = useGetDirectionsQuery(
    pointACoords && pointBCoords
      ? { origin: pointACoords, destination: pointBCoords, mode: "TRAIN" }
      : ({} as any),
    {
      skip: !pointACoords || !pointBCoords,
      refetchOnMountOrArgChange: true,
    }
  );

  // Отдельный эффект для обработки координат и инициации поиска маршрута
  useEffect(() => {
    // Проверяем, что координаты установлены и это не первый рендер
    if (pointACoords && pointBCoords) {
      // Если это первый рендер после загрузки координат из URL, помечаем, что рендер произошел
      if (isFirstRender.current) {
        isFirstRender.current = false;

        // Если у нас есть координаты из URL, запускаем поиск маршрута
        if (searchParams?.has("pointALat")) {
          handleSearchWithoutRefetch();
        }
      }
    }
  }, [pointACoords, pointBCoords]);

  // Функция для поиска маршрута без вызова refetch (для первого рендера)
  const handleSearchWithoutRefetch = () => {
    if (!pointACoords || !pointBCoords) return;

    setIsSearched(true);

    // Используем DirectionsService для получения маршрута
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pointACoords,
        destination: pointBCoords,
        travelMode: google.maps.TravelMode.WALKING,
        region: "KG",
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Failed to fetch directions:", status);
        }
      }
    );
  };

  // Функция для поиска маршрута (вызывается при явном нажатии кнопки поиска)
  const handleSearch = () => {
    if (!pointACoords || !pointBCoords) return;

    setIsSearched(true);

    // После первого рендера запросы уже будут инициализированы, и мы можем безопасно вызвать refetch
    if (!isFirstRender.current) {
      refetchWalk();
      refetchCar();
      refetchTrain();
    }

    // Используем DirectionsService для получения маршрута
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pointACoords,
        destination: pointBCoords,
        travelMode: google.maps.TravelMode.WALKING,
        region: "KG",
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error("Failed to fetch directions:", status);
        }
      }
    );
  };

  return (
    <div className={scss.Routes}>
      <div className={scss.block1}>
        <div className={scss.blockInputs}>
          <SearchBar
            pointA={pointA}
            pointB={pointB}
            setPointA={setPointA}
            setPointB={setPointB}
            pointACoords={pointACoords}
            pointBCoords={pointBCoords}
            setPointACoords={setPointACoords}
            setPointBCoords={setPointBCoords}
            onSearch={handleSearch}
            autocompleteA={autocompleteA}
            autocompleteB={autocompleteB}
            setModalWindowTime={setModalWindowTime}
          />
          {!modalWindowTime && (
            <div className={scss.blockCitys}>
              <div className={scss.cityImgs}>
                <img src={Talas.src} alt="talas" className={scss.imgTalas} />
                <img src={Chui.src} alt="chui" className={scss.imgChui} />
                <img src={Kyl.src} alt="kyl" className={scss.imgKyl} />
                <img
                  src={JalalAbad.src}
                  alt="JalalAbad"
                  className={scss.imgJalalAbad}
                />
                <img src={Naryn.src} alt="Naryn" className={scss.imgNaryn} />
                <img src={Osh.src} alt="Osh" className={scss.imgOsh} />
                <img src={Batken.src} alt="Batken" className={scss.imgBatken} />
              </div>
              <div className={scss.cityTitle}>
                <h5>{t("Талас", "تالاس", "Talas")}</h5>
                <h5>{t("Чуй", "تشوي", "Chui")}</h5>
                <h5>{t("Иссык-Куль", "إيسيك كول", "Issyk-Kul")}</h5>
                <h5>{t("Джалал-Абад", "جلال أباد", "Jalal-Abad")}</h5>
                <h5>{t("Нарын", "نارين", "Naryn")}</h5>
                <h5>{t("Ош", "أوش", "Osh")}</h5>
                <h5>{t("Баткен", "باتكين", "Batken")}</h5>
              </div>
            </div>
          )}
          {modalWindowTime && (
            <RouteInfo
              walkData={walkData}
              walkError={walkError}
              carData={carData}
              carError={carError}
              trainData={trainData}
              trainError={trainError}
              isSearched={isSearched}
              setModalWindow={setModalWindow}
            />
          )}
        </div>
        {modalWindow && (
          <>
            <AirlineList setModalWindow={setModalWindow} />
          </>
        )}

        {modalWindowTime && (
          <div className={scss.map}>
            <Map directions={directions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes;
