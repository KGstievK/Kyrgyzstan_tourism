'use client'

import scss from './Tab_place.module.scss';
import useTranslate from '@/appPages/site/hooks/translate/translate';



const Tab_place = () => {
    const { t } = useTranslate();



    return (
        <div className={scss.tab_place}>
            <p>{t('', '', 'Where to go')}</p>
            <form className={scss.from} >
                <input 
                    type="text" 
                    placeholder={t('', '', 'From where?')} 
                />
                <input 
                    type="text" 
                    placeholder={t('', '', 'Where')} 
                />
                <button type="submit">{t('', '', 'go')}</button>
            </form>
            
            <div className={scss.map}>
                
            </div>
        </div>
    );
};

export default Tab_place;