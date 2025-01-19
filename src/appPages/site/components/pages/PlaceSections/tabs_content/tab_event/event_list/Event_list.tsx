import eventImg from '@/assets/images/placeImages/event copy.png'
import ulukImg from '@/assets/images/placeImages/uluk.jpg'
import scss from './Event_list.module.scss';
const Event_list = () => {
    return (
        <div className={scss.list}>
                {Array.from({length: 12}, (_,i) => (
                    <div key={i} className={scss.item}>
                        <div className={scss.img}>
                            <img src={ulukImg.src} alt="" />
                            <div className={scss.eventTabs}>
                                <div className="">
                                    <img src={eventImg.src} alt="" />
                                </div>
                                <div className="">
                                    <img src={eventImg.src} alt="" />
                                    concert
                                </div>
                                <div className="">
                                    <img src={eventImg.src} alt="" />
                                </div>
                            </div>
                        </div>   
                        <div className={scss.info}>
                            <h6>Concert Ulukmanapo</h6>
                            <p>4 August  at 22:00, White Club Republic(Hippodrome, Cholpon-Ata)</p>
                        </div>
                    </div>
                ))
                }
            </div> 
    );
};

export default Event_list;