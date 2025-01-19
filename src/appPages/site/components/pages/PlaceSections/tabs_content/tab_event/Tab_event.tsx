import scss from './Tab_event.module.scss';
import searchImg from '@/assets/images/placeImages/search.png'
import Calendar from './calendar/Calendar';
import Event_list from './event_list/Event_list';
import useTranslate from '@/appPages/site/hooks/translate/translate';
const Tab_event = () => {
    const {t} = useTranslate()
    return (
        <div className={scss.event}>
           <div className={scss.filter}>
                <div className={scss.poster}>
                    <h2>{t("","","Poster")}</h2>
                    <div className={scss.search}>
                        <img src={searchImg.src} alt="" />
                        <input type="text" placeholder={t("Поиск","","Search")}/>
                    </div>

                </div>
                <Calendar />

            </div>
            <Event_list />
        </div>
    );
};

export default Tab_event;