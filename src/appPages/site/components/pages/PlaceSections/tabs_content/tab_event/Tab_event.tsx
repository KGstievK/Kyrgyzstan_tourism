import scss from './Tab_event.module.scss';
import Calendar from './calendar/Calendar';
import Event_list from './event_list/Event_list';
import { useState } from 'react';
import Poster from './poster/Poster';
import { useGetEventListQuery } from '@/redux/api/place';
import { usePathname } from 'next/navigation';
const Tab_event = () => {
    const pathName = usePathname()
    const routeName = pathName.split("/")[2]
    
    const [category, setCategory] = useState("");
    const [search, setIsSearch] = useState("");
    const [date, setIsDate] = useState("");
    const {data, isLoading, isError} = useGetEventListQuery({category, search, date})
    return (
        <div className={scss.event}>
           <div className={scss.filter}>
                <Poster setIsSearch={setIsSearch}/>
                <Calendar setIsDate={setIsDate}/>

            </div>
            <Event_list data={data || null} category={category} setCategory={setCategory} search={search} date={date}/>
        </div>
    );
};

export default Tab_event;