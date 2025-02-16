import Reviews from '@/appPages/site/ui/reviews/Reviews';
import scss from './Place.module.scss';
import Places from './place/Places';
import PlacesPopular from './placesPopular/PlacesPopular';
import Tabs_content from './tabs_content/Tabs_content';
import PhotoUploadModal from '@/appPages/site/ui/reviews/statisticColumn/photoUploadModal/PhotoUploadModal';
import ReviewModal from '@/appPages/site/ui/reviews/statisticColumn/reviewModal/ReviewModal';

const Place = () => {
    return (
        <div id={scss.Place}>
            <Places />
            <Tabs_content />
            <Reviews/>
            <PlacesPopular/>
        </div>
    );
};

export default Place;