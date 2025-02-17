import React from "react";
import { Hero } from "./hero/Hero";
import About from "./about/About";
import Culture from "./culture/Culture";
import Map from "./map/Map";
import Attractions from "./attractions/Attractions";
const HomeSection = () => {
  return (
    <div>
      <Hero />
      <About />
      <Attractions />
      {/* <Culture /> */}
      <Map />
    </div>
  );
};

export default HomeSection;
