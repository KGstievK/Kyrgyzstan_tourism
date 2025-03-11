import React, { useState } from 'react';
import styles from './AirLineModal.module.scss';
import { Globe, Plane, X } from 'lucide-react';

interface Airline {
  name: string;
  logo: React.ReactNode;
  logoClass: string;
  description: string;
  destinations: string[];
}

const AirlineCard: React.FC<{ airline: Airline }> = ({ airline }) => {
  return (
    <div className={styles.airlineCard}>
      {/* Логотип в левом верхнем углу */}
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <span className={`${styles.logoText} ${styles[airline.logoClass]}`}>
            {airline.logo}
          </span>
        </div>
      </div>
      
      {/* Горизонтальная линия с названием, описанием и направлениями */}
      <div className={styles.contentRow}>
        {/* Название */}
        <div className={styles.nameColumn}>
          <h2 className={styles.airlineName}>{airline.name}</h2>
        </div>
        
        {/* Описание */}
        <div className={styles.descriptionColumn}>
          <p className={styles.description}>{airline.description}</p>
        </div>
        
        {/* Направления */}
        <div className={styles.destinationsColumn}>
          <h3 className={styles.destinationsTitle}>
            <Plane className={styles.planeIcon} />
            Направления:
          </h3>
          <div className={styles.destinationsList}>
            {airline.destinations.map((destination, index) => (
              <div key={index} className={styles.destinationTag}>
                <Globe className={styles.destinationIcon} />
                <span>{destination}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Кнопка подробнее */}
      <div className={styles.buttonContainer}>
        <a href="#" className={styles.button}>
          Подробнее
        </a>
      </div>
    </div>
  );
};

const AirlineModal: React.FC<{ setModalWindow: (boolean: boolean) => void }> = ({ setModalWindow }) => {
  const airlines: Airline[] = [
    {
      name: "Аэрофлот",
      logo: "A",
      logoClass: "logoRed",
      description: "Крупнейшая авиакомпания России, предлагающая рейсы в более чем 50 стран мира с высоким уровнем сервиса.",
      destinations: ["Москва", "Париж", "Нью-Йорк", "Токио", "Дубай"]
    },
    {
      name: "S7 Airlines",
      logo: "S7",
      logoClass: "logoGreen",
      description: "Одна из крупнейших частных авиакомпаний России с современным парком самолетов Airbus и Boeing.",
      destinations: ["Москва", "Санкт-Петербург", "Берлин", "Пекин", "Рим"]
    },
    {
      name: "Emirates",
      logo: "E",
      logoClass: "logoRed",
      description: "Авиакомпания из ОАЭ, одна из лучших в мире по качеству обслуживания и комфорту пассажиров.",
      destinations: ["Дубай", "Лондон", "Нью-Йорк", "Сидней", "Токио"]
    },
    {
      name: "Lufthansa",
      logo: "L",
      logoClass: "logoBlue",
      description: "Крупнейшая немецкая авиакомпания, известная надежностью, пунктуальностью и высоким качеством сервиса.",
      destinations: ["Франкфурт", "Мюнхен", "Париж", "Лондон", "Нью-Йорк"]
    },
    {
      name: "Turkish Airlines",
      logo: "TK",
      logoClass: "logoRed",
      description: "Национальный авиаперевозчик Турции, летает более чем в 120 стран мира с отличной кухней на борту.",
      destinations: ["Стамбул", "Анкара", "Москва", "Лондон", "Нью-Йорк"]
    },
    {
      name: "Qatar Airways",
      logo: "QA",
      logoClass: "logoPurple",
      description: "Одна из лучших авиакомпаний мира, базирующаяся в Дохе, отмечена многочисленными наградами за качество обслуживания.",
      destinations: ["Доха", "Лондон", "Сингапур", "Нью-Йорк", "Сидней"]
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={() => setModalWindow(false)}>
            <X />
          </button>
        </div>
        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Каталог авиакомпаний</h1>
          <div className={styles.airlinesList}>
            {airlines.map((airline, index) => (
              <AirlineCard key={index} airline={airline} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface AirlineModalProps {
    setModalWindow: () => void
}


export default AirlineModal;