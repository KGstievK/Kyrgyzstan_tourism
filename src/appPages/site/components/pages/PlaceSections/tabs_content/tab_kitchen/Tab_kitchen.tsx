import scss from './Tab_kitchen.module.scss';
import Cafes from './cafes/Cafes';
import Cafe_item from './cafe_item/Cafe_item';
import { useState } from 'react';
import { useGetKitchensQuery } from '@/redux/api/place';
import Cafe_map from './cafe_map/Cafe_map';
export const Tab_kitchen = () => {
    const [currentId, setCurrentId] = useState<number | null>(null);
    const {data, isLoading} = useGetKitchensQuery()
    return (
      <div className={scss.kitchen}>
        <Cafe_map />
        <Cafes
          isCurrent={currentId}
          setIsCurrent={setCurrentId}
        />
        <Cafe_item kitchens={data} isCurrent={currentId} />
      </div>
    );
  };

export default Tab_kitchen;