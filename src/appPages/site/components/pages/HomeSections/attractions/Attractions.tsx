import React from 'react';
import scss from './attractions.module.scss';

interface Attraction {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  toimag:string;
}

const attractionsData: Attraction[] = [
  {
    id: 1,
    title: 'The Burana Tower',
    description: 'The Burana Tower is located in the Chuy region in northern Kyrgyzstan, about 80 km (50 miles) east of the capital Bishkek near the city Tokmok. This impressive ancient minaret still survives today as one of the key historical sites in Kyrgyzstan. ',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/8100/6c8b/4abf5017ec573e25e60c3a0b78d7e9b4?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mbVgMYOevuvmyAFaUQKZiXmMsfuXi8VP7Sd4ZpmjNSg-55x1KgDPO5bdAFrgjV~C~T6tWAEqhehFBzVkHpGbgJ6jRVb7JqhuAnuW0LGPTw~4IYzxfgi2OpQlFB13YBgvAjcqONAURzydHNNlMWqwej~aW1sIFyR7rQSHOIw0GU623hNh6WztaSS08NDfdh-g3tm22gs60AGq7PaX-fF7pXInHRPOVtct75bFHxkZdV9ydBJZ68ZJ-VTSrLVI4XvlfMQxDb2OnEX2NM8Gs6xnWM3nRJBQ45gKQmnbUtgpEDZ7kpNMmH5egYBuo2axNmPXRbhD2QQ0kdtOVfW-XQaJ9A__',
    toimag:'/images/free-png.ru-213-370x370.png',

  },
  {
    id: 2,
    title: 'The Burana Tower',
    description: 'The Burana Tower is located in the Chuy region in northern Kyrgyzstan, about 80 km (50 miles) east of the capital Bishkek near the city Tokmok. This impressive ancient minaret still survives today as one of the key historical sites in Kyrgyzstan. ',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/03a7/ea01/2fb4e72788ba2d30289233501cb229c3?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jTzQ7p8F95pCuQZ0CXnx8MHI83p6fSC6h~24SOGlmLFgPd9Ob87A4s92pT9UTSOsuR7z3hMynXS12yZMbD~4Uq2JNTsNMBAGbLWBbkKQZy0UdsVpMbRA6945x~vCG7RNwbIdaN1TqKpg~YavUW0tuy2J85aS1dLDFahjJ0PEJ-PltaBStvagJ4110CkqIoimv~Pu9gynV-~Nh2usV2uF9LTITpFzVZY~Q8IHM9UUmgZlfCAvkacdsS8khgkSZ7xLVq7oX1JYk~sOmuw6-VoDTwrAF-FtUb05AFJadCuRC9XrieQTik~xjznxWQiC11BFSqlMo05qBshlAqZv3TWawQ__',
    toimag:"/images/free-png.ru-213-370x370.png",

  },
  {
    id: 3,
    title: 'The Burana Tower',
    description: 'The Burana Tower is located in the Chuy region in northern Kyrgyzstan, about 80 km (50 miles) east of the capital Bishkek near the city Tokmok. This impressive ancient minaret still survives today as one of the key historical sites in Kyrgyzstan. ',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/ccd9/50af/fab3e871b5bba34f03a8a8f6e4302367?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oI1l3RjtuO6wrjAYm6ndInv7fV6kRF6uzca~50cgc40dF-yUXgt-qJl78Imd4FHbO8-S2kV-rLf-oibVJZVmjN0N7cZhaNG8t8gPppAdZlPLZ54~alBrxpo-LYQa421Q6dgWUEPq074xxvxhEf6lF4jTVD9SDij5oylw8-5DthVF-k9CNc1gVjZ6VA3GrUaq5nRqSyo-u6SpX0SSqO1rEescZbqjSasiP0o2M6fb-yGZbkXr~M6yO~z7Q~FiJAZAfJJHpb8ICGz~YLWJ6ZqpQw6F79yKcNGy1TQFSjXwSDLyZwpEw7jrG-x~kIDWDS2ROAhLaGflsPmg18F3MYQPlg__',
    toimag:"/images/free-png.ru-213-370x370.png",
  },
  {
    id: 4,
    title: 'The Burana Tower',
    description: 'The Burana Tower is located in the Chuy region in northern Kyrgyzstan, about 80 km (50 miles) east of the capital Bishkek near the city Tokmok. This impressive ancient minaret still survives today as one of the key historical sites in Kyrgyzstan. ',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/612b/d7a4/3f45a4c546e8263129584769742d0930?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ib4KyyWFpQBgWNxXsrGpUUV1N0p5AX-Vi~iIdqAPVo77PuVXgdqfflDxsOiGDY9sfoIfNOlr-aQGZo7mSN4MP6p9uZJycHbkfniaFY~BqYNsMG05AmskZvemuRuaEo4702BUVBkd~uNkcgIlCL3MlxViaL9DHNOwgsFHOPu0EpdIWQBugD-QmahjgKvjK04Mz2mESFEAlQq0RDulCmAMr9REfyRHqbXEw0KX7WMyoFTui3B2yrV-DNAtTLpo6fdP8hxIUkliwcAbFUxG5of7zOQAFBKAzQk65YCI~937Q4ILR-DtdPYtno7g2P-yuFOI-MdvJ~sCJJkekLy7DJwBKw__',
    toimag:"/images/free-png.ru-213-370x370.png",
  },
  {
    id: 5,
    title: 'The Burana Tower',
    description: 'The Burana Tower is located in the Chuy region in northern Kyrgyzstan, about 80 km (50 miles) east of the capital Bishkek near the city Tokmok. This impressive ancient minaret still survives today as one of the key historical sites in Kyrgyzstan. ',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/6619/dcaf/64c764ad0254ba461878cc296fd7d86a?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NBEWBpkkuyPXXbdeFw89vase29x8n9bN3E~5JIUQWbKiISJdbCuieq88kcMy08RrU5c63-tI27WiRFEDegICjYchDRnBq11Kb~aMZtmoUk5uAIoJxbVc0cGN2KW4MYAIowJrc-goye1y9pFWEsKQES0yFOTohwhW8cEhl~Czxk6cptzlT7nFWCKSks9JcNTg0hIpYf1kpgD~LIeowT6QWQwwDI-bM0QBoMVOQ9IIE7kOZPkpIGuAG~3721bJKTftOk1f6WPTV~aWfdZW75VimQe~uALalLUoQmdtr4coSC94GFDsC35iAw~iDP3t~MPqs1mtQ14LgN2z8uUVq8DoBw__',
    toimag:"/images/free-png.ru-213-370x370.png",
  },
  {
    id: 6,
    title: 'The Burana Tower',
    description: 'The Burana Tower is located in the Chuy region in northern Kyrgyzstan, about 80 km (50 miles) east of the capital Bishkek near the city Tokmok. This impressive ancient minaret still survives today as one of the key historical sites in Kyrgyzstan. ',
    imageUrl: 'https://s3-alpha-sig.figma.com/img/9a1f/51f1/3d82c180901250270a1068a32de214d0?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FD2cxKPCOgNcZ5CQnypDhkgpjuWhH5WlZdF6RPZswxfBfPwzaiQKGuZpSopfYuveN9wdARzWQIVWmQbSJzipGza5K9y46~36rtwMO6DO-FwV2e5P5tyCxFjKnahA-qkl8~-HeCRDGCDZ44Ecxse9tQfxCdWV6mxH4zsAdDx2nvMDVSTpOXBj3VgefanJcWKTh-DbF65tcTm7YHYw~3Oi5PENgPV9tK2NcOq14UMq9I8A8H-Vh5WxsJepVT2uVDNs~MSowLHgwtx2-t61Jnm~g4vIMMEMtzbY-9B8pd1JwulBzO7YXCIzK1dtm~zEGHXArdgc7Rjf23kSrumUJvmJXQ__',
    toimag:"/images/free-png.ru-213-370x370.png",
  },
];

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  toimag:string;
}

export const Card: React.FC<CardProps> = ({ title, description, imageUrl,toimag }) => {
  return (
    <div>
     <div className="container">
    <div className={scss.card}>

<div className={scss.cardImg}>
<img className={scss.imageS} src={imageUrl} alt={title} />
<div className={scss.imglike}><img className={scss.like} src="/images/like.svg" alt="" /></div>
  </div>     
  <div className={scss.textblock}> 
      <h2 className={scss.cardTitle}>{title}</h2>
     <p className={scss.cardDescription}>{description}</p></div>
     
     <img className={scss.cardimgs} src={toimag} alt="" />

    </div>
    
    </div>
    </div>
  );
};

const Attractions: React.FC = () => {
  return (
   
  <div  id={scss.Attractions}>
     <div className="container">  
     <h1 className={scss.title}>Attractions</h1>

   <div className={scss.cardsContainer} >
     {attractionsData.map((el) => (
       <Card
         key={el.id}
         title={el.title}
         description={el.description}
         imageUrl={el.imageUrl}
         toimag={el.toimag}
       />
     ))}
   </div>
   </div>
  </div>
    
  );
};

export default Attractions;
