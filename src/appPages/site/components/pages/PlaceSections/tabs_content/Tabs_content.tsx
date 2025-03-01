"use client"
import { useState } from 'react';
import scss from './Tabs_content.module.scss';
import placeImg from "@/assets/images/placeImages/place.png"
import hotelImg from "@/assets/images/placeImages/hotel.png"
import kitchenImg from "@/assets/images/placeImages/kitchen.png"
import eventImg from "@/assets/images/placeImages/event.png"
import attImg from "@/assets/images/placeImages/att.png"
import Tab_place from './tab_place/Tab_place';
import Tab_kitchen from './tab_kitchen/Tab_kitchen';
import Tab_event from './tab_event/Tab_event';
import Tab_attractions from './tab_attractions/Tab_attractions';
import Tab_hotel from './tab_hotel/Tab_hotel';
const Tabs_content = () => {

    const tabsButton = [
        {
            id:0,
            name: "place",
            img: placeImg
        },
        {
            id: 1,
            name: 'Hotel',
            img: hotelImg
        },
        {
            id: 2,
            name: 'Kitchen',
            img: kitchenImg
        },
        {
            id: 3,
            name: 'Event',
            img: eventImg
        },
        {
            id: 4,
            name: 'Attractions',
            img: attImg
        }
    ]

    const [isTab, setIsTab] = useState<number>(2);

    return (
        <section id={scss.Tabs_content}>
            <div className="container">
                
                <div className={scss.tabs}>
                    {tabsButton.map((tab)  => (
                        <button 
                            style={isTab === tab.id ? {background: '#004A60', color: "white"} : {background: 'transparent'}}
                            key={tab.id}
                            onClick={() => setIsTab(tab.id)}
                            className={isTab === tab.id ? scss.active : ""}
                        >
                            <img src={tab.img.src} alt="tabs" />
                            {tab.name}
                        </button>
                    ))}
                </div>
                
                <div className={scss.content}>
                    {isTab === 0 && <Tab_place isTab={isTab} />}
                    {isTab === 1 && <Tab_hotel isTab={isTab}/>}
                    {isTab === 2 && <Tab_kitchen isTab={isTab}/>}
                    {isTab === 3 && <Tab_event />}
                    {isTab === 4 && <Tab_attractions isTab={isTab}/>}
                </div>
            </div>
        </section>
    )
}

export default Tabs_content;