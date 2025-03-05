"use client";
import React, { useState } from "react";
import scss from "./Routes.module.scss";
import Talas from "../../../../../assets/images/routesImages/Talas.png";
import Chui from "../../../../../assets/images/routesImages/Chui.png";
import Kyl from "../../../../../assets/images/routesImages/kyl.png";
import JalalAbad from "../../../../../assets/images/routesImages/JalalAbad.png";
import Naryn from "../../../../../assets/images/routesImages/Naryn.png";
import Osh from "../../../../../assets/images/routesImages/Osh.png";
import Batken from "../../../../../assets/images/routesImages/Batken.png";
import { BsPersonWalking } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import { FaBus, FaRegCalendar, FaUser } from "react-icons/fa";
import { IoMdSubway } from "react-icons/io";
import { GiAirplaneDeparture } from "react-icons/gi";
import { PiAirplaneLandingFill, PiAirplaneTakeoffFill } from "react-icons/pi";
import airport1 from "../../../../../assets/images/routesImages/airport1.png";
import airport2 from "../../../../../assets/images/routesImages/airport2.png";
import airport3 from "../../../../../assets/images/routesImages/airport3.png";
import route from "../../../../../assets/images/routesImages/route.png";
import { IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Routes = () => {
  const newbilet = ["8:00", "8:20", "8:30", "8:40", "9:00"];
  const [count, setCount] = useState<number>(1);
  const [modalWindowTime, setModalWindowTime] = useState<boolean>(false);
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [modalWindowTickets, setModalWindowTickets] = useState<boolean>(false);
  const [filterAvia, setFilterAvia] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className={scss.Routes}>
      <div className={scss.block1}>
        <div className={scss.blockInputs}>
          <div className={scss.inputs}>
            <input type="text" />
            <input type="text" placeholder="Where?" />
            <button
              onClick={() => setModalWindowTime(!modalWindowTime)}
              className={scss.btnGo}
            >
              {modalWindowTime ? "Close" : "Go"}
            </button>
          </div>
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
                <h5>Talas</h5>
                <h5>Chui</h5>
                <h5>Issyk-Kyl</h5>
                <h5>Jalal-Abad</h5>
                <h5>Naryn</h5>
                <h5>Osh</h5>
                <h5>Batken</h5>
              </div>
            </div>
          )}
          {modalWindowTime && (
            <div className={scss.blockTime}>
              <div className={scss.Time}>
                <TiLocation className={scss.icon} />
                <p>356 km</p>
              </div>
              <div className={scss.Time}>
                <BsPersonWalking className={scss.icon} />
                <p>72 hours</p>
              </div>
              <div className={scss.Time}>
                <FaBus className={scss.icon} />
                <p>7-8 hours</p>
              </div>
              <div className={scss.Time}>
                <IoMdSubway className={scss.icon} />
                <p>7-8 hours</p>
              </div>
              <div onClick={() => setModalWindow(true)} className={scss.Time}>
                <GiAirplaneDeparture className={scss.icon} />
                <p>5 tickets</p>
              </div>
            </div>
          )}
        </div>
        {modalWindow && (
          <>
            <div
              onClick={() => setModalWindow(false)}
              className={scss.modalWindowBg}
            ></div>{" "}
            <div
              className={
                modalWindowTickets ? scss.modalWindowAll : scss.modalWindow
              }
            >
              {modalWindowTickets ? (
                <div className={scss.textIcon}>
                  <h5>We found 5 tickets according to your request</h5>
                  <IoClose
                    onClick={() => setModalWindowTickets(false)}
                    className={scss.IoClose}
                  />
                </div>
              ) : (
                <h4>Search for cheap airline tickets</h4>
              )}
              <div className={scss.SearchInputs}>
                <div className={scss.block11}>
                  <PiAirplaneTakeoffFill className={scss.icon} />
                  <h6>Bishkek</h6>
                </div>
                <div className={scss.block11}>
                  <PiAirplaneLandingFill className={scss.icon} />
                  <h6>Jalal-Abad</h6>
                </div>
                <button
                  onClick={() => setModalWindowTickets(!modalWindowTickets)}
                  className={scss.searchBtn}
                >
                  Search
                </button>
              </div>
              <div className={scss.blockCat}>
                <div className={scss.chooseData}>
                  <FaRegCalendar className={scss.calendarIcon} />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Choose Date"
                    className={scss.dateInput}
                  />
                </div>
                <div
                  onClick={() => setCount(count + 1)}
                  className={scss.ticketNumber}
                >
                  <FaUser className={scss.userIcon} />
                  <span>{count}</span>
                </div>
                <div
                  onClick={() => setFilterAvia(!filterAvia)}
                  className={scss.filter}
                >
                  <span>Filters</span>
                </div>
              </div>
              {filterAvia && (
                <div className={scss.filterAvia}>
                  <div className={scss.transfer}>
                    <p>With transfer</p>
                    <label className={scss.switch}>
                      <input type="checkbox" />
                      <span className={scss.slider}></span>
                    </label>
                  </div>
                  <div className={scss.transfer}>
                    <p>Without transfer</p>
                    <label className={scss.switch}>
                      <input type="checkbox" />
                      <span className={scss.slider}></span>
                    </label>
                  </div>
                  <div className={scss.transfer}>
                    <p>With luggage</p>
                    <label className={scss.switch}>
                      <input type="checkbox" />
                      <span className={scss.slider}></span>
                    </label>
                  </div>
                  <div className={scss.transfer}>
                    <p>Without luggage</p>
                    <label className={scss.switch}>
                      <input type="checkbox" />
                      <span className={scss.slider}></span>
                    </label>
                  </div>
                </div>
              )}

              {modalWindowTickets && (
                <div className={scss.modalWindowTickets}>
                  <div className={scss.blockImages}>
                    <img
                      src={airport1.src}
                      alt="airport1"
                      className={scss.airport1}
                    />
                    <img
                      src={airport2.src}
                      alt="airport1"
                      className={scss.airport2}
                    />
                    <img
                      src={airport3.src}
                      alt="airport1"
                      className={scss.airport3}
                    />
                  </div>
                  {newbilet.map((el, idx) => (
                    <div key={idx} className={scss.ticketsTime}>
                      <img
                        src={airport2.src}
                        alt="airport2"
                        className={scss.airportImg}
                      />
                      <div className={scss.block22}>
                        <div className={scss.blockTiket1}>
                          <p className={scss.time}>{el}</p>
                          <div className={scss.text}>
                            <p className={scss.adresTitle}>Bishkek</p>
                            <span className={scss.dateTitle}>
                              18 May, friday
                            </span>
                          </div>
                        </div>
                        <img
                          src={route.src}
                          alt="route"
                          className={scss.route}
                        />
                        <div className={scss.blockTiket2}>
                          <p className={scss.time}>{el}</p>
                          <div className={scss.text}>
                            <p className={scss.adresTitle}>Bishkek</p>
                            <span className={scss.dateTitle}>
                              18 May, friday
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {modalWindowTime && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.670015518168!2d74.58255517561444!3d42.87980860210807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9ba3daadfbb%3A0x4e7a5fa037f5fd93!2sMotion%20Web%20IT%20academy!5e0!3m2!1sru!2skg!4v1739784720486!5m2!1sru!2skg"
          width="100%"
          height="712px"
          style={{ border: 0 }}
          className={scss.map}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
};

export default Routes;
