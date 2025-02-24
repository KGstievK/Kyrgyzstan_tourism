// import useTranslate from "@/appPages/site/hooks/translate/translate";
// import styles from "./CultureGames.module.scss";
// import { useGetGamesQuery } from "@/redux/api/culture";

// const CultureGames = () => {
//   const { t } = useTranslate();
//   const { data, isError } = useGetGamesQuery();

//   if (isError) return null;

//   return (
//     <section className={styles.section}>
//       <div className="container">
//         <div className={styles.top}>
//           <div className={styles["muted-background"]}></div>
//           <h1 className={styles["top-heading"]}>
//             {t("игры", "ألعاب", "gamesыы")}
//           </h1>
//           <p className={styles["top-paragraph"]}>
//             {t(
//               "С древних времен кыргызы придавали большое значение народным играм и развлечениям, ни один народный праздник не обходился без них. Традиционные конные игры остаются самыми любимыми и почитаемыми.",
//               "منذ العصور القديمة، أولى القرغيز أهمية كبيرة للألعاب والأنشطة الشعبية، ولم يكن أي مهرجان شعبي يخلو منها. تظل الألعاب الفروسية التقليدية الأكثر حباً وتقديراً.",
//               "Since ancient times, the Kyrgyz have given a great place to folk games and entertainment, not a single folk festival took place without them. Traditional equestrian games remain the most beloved and revered."
//             )}
//           </p>
//         </div>
//         {data?.map((el, idx) => (
//           <div key={idx} className={styles.main}>
//             <div className={styles.img} style={{background: `url(${el.games_image}) center/cover no-repeat`}}></div>
//             <div className={styles["main-text"]}>
//               <h3 className={styles["main-heading"]}>{el.games_name}</h3>
//               <p className={styles["main-paragraph"]}>{el.games_description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CultureGames;

import React from 'react';
import styles from './CultureGames.module.scss';
import img from '@/assets/images/cultureImages/main-culture.jpg';
interface GameProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const Game: React.FC<GameProps> = ({ title, description, imageSrc, imageAlt }) => {
  return (
    <article className={styles.game}>
      <div className={styles.game__imageContainer}>
        <img src={imageSrc} alt={imageAlt} className={styles.game__image} />
      </div>
      <div className={styles.game__content}>
        <h2 className={styles.game__title}>{title}</h2>
        <p className={styles.game__description}>{description}</p>
      </div>
    </article>
  );
};

const GamesPage: React.FC = () => {
  const games: GameProps[] = [
    {
      title: "Ulak-tartysh",
      description: "Ulak-tartysh, which means \"gray wolf\". They say that it originated in ancient times when nomadic peoples would fight hordes of animals together in the steppe in order to survive. The game has a bit of a dark past, however. It was named after an error that occurred in the game in Samarkand, which was a great disaster for people. Since these were the times when nomadic horsemen would attack settlements and drive away people and livestock. The goal of each team is to throw the carcass of the animal into the opponent's tai-kazan. Carrying and throwing a 20-kilogram carcass requires a lot of skill and strength.",
      imageSrc: img.src,
      imageAlt: "Ulak-tartysh game"
    },
    {
      title: "Kyz-kuumai",
      description: "Kyz-kuumai is a racing competition between a boy and a girl. The goal of the game is when the boy catches up to the girl during the race. The girl always rides a faster, and it starts off in several earlier. If the pursuit catches up to the girl, the rider has the right to kiss her as a reward, otherwise, the girl will hit him with a whip.",
      imageSrc: img.src,
      imageAlt: "Kyz-kuumai game"
    },
    {
      title: "Korkut",
      description: "Korkut is more of the music-al instruments. Supposedly, Dede Korkut prayed to God to grant him immortality. The angel of death threatened him that he would come for him wherever he went. Korkut traveled around the world until he reached the Syr Darya river, where he spread his carpet.",
      imageSrc: img.src,
      imageAlt: "Korkut game"
    },
    {
      title: "Ordo",
      description: "Ordo is one of the most complex Kyrgyz national folk games with battle scenes, which remains popular to this day. The game corresponds to some extent to chess, it requires strategy, tactics, foresight, the ability to think analytically. Ordo was originally a military exercise, which gained the status of a sport. The traditional Ordo game was popular among almost all Kyrgyzstandars. It teaches the young generation to get acquainted with the history of their country and the military art of the Kyrgyz.",
      imageSrc: img.src,
      imageAlt: "Ordo game"
    },
    {
      title: "Tyiyn-enmei",
      description: "Tyiyn enmei (picking a coin from the ground on a gallop on a horse) is an ancient sporting game of the Kyrgyz. In the old times people used coins, but now they use coins. The game starts when the referee throws the coin on the ground and the rider gets to the start on the horse. The goal of Tyiyn enmei is to pick up the coin from the ground on a gallop on a horse. The game itself is accompanied by the demonstration of riding art, dexterity, agility, and quick reaction. It is the way in which coins are picked up that matters most. The person who picks up the most coins is the winner.",
      imageSrc: img.src,
      imageAlt: "Tyiyn-enmei game"
    }
  ];

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.banner}>
        <h1 className={styles.banner__title}>Games</h1>
        <p className={styles.banner__description}>
          Games are traditions, the things have glorious past glory and a strong future. Traditional concentrated in a simple but important physical exercises must treated by modern technologies.
        </p>
      </div>
      
      <main className={styles.games}>
        {games.map((game, index) => (
          <Game
            key={index}
            title={game.title}
            description={game.description}
            imageSrc={game.imageSrc}
            imageAlt={game.imageAlt}
          />
        ))}
      </main>
    </div>
  );
};

export default GamesPage;