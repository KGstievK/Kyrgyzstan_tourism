import scss from './Tab_event.module.scss';
import Calendar from './calendar/Calendar';
import Event_list from './event_list/Event_list';
import useTranslate from '@/appPages/site/hooks/translate/translate';
import { useState } from 'react';
import Poster from './poster/Poster';
const Tab_event = () => {
    const [category, setCategory] = useState("");
    const [search, setIsSearch] = useState("");
    const [date, setIsDate] = useState("");
    return (
        <div className={scss.event}>
           <div className={scss.filter}>
                <Poster setIsSearch={setIsSearch}/>
                <Calendar setIsDate={setIsDate}/>

            </div>
            <Event_list category={category} setCategory={setCategory} search={search} date={date}/>
        </div>
    );
};

export default Tab_event;