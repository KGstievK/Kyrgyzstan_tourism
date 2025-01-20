import scss from "../hero/Hero.module.scss";

export const Hero = () => {
  return (
    <div id={scss.Hero}>
      <div className={`container ${scss.container}`}>
        <div className={scss.Hero}>
          <div className={scss.iconsblock}>
            <h1 className={scss.pages}>Welcome to the amazing Kyrgyzstan!</h1>

            <div className={scss.icons1}>
              <img
                className={scss.ins}
                src="/images/instagram-167-svgrepo-com.svg"
                alt=""
              />
              <img className={scss.facebook} src="/images/faceb.svg" alt="" />
              <img className={scss.vk} src="/images/vk..svg" alt="" />
              <img className={scss.mail} src="/images/mail.svg" alt="" />
            </div>
          </div>

          <div className={scss.pageblock}>
            <div className={scss.input_container}>
              <input
                className={scss.homeinput}
                type="text"
                placeholder="Where to go?"
              />
            </div>
            <button className={scss.homebtn}>
              <img src="/images/vec.svg" alt="" />
            </button>
          </div>

          <p className={scss.hometext}>
            Are you ready to embark on an exciting journey through the stunning
            country of Central Asia? We are ready to help you plan the perfect
            trip to Kyrgyzstan.
          </p>
        </div>
      </div>
      <div className={scss.heroTwo}>
        <div className={`container ${scss.heroTwoContainer}`}>
          <h1 className={scss.twoText}>Kyrgyzstan</h1>
          <p className={scss.twoTitle}>
            Kyrgyz Republic is a landlocked country located in the heart of
            Central Asia. The capital is Bishkek. The mountainous region of the
            Tian Shan covers over 80% of the country. Kyrgyzstan is occasionally
            referred to as "the Switzerland of Central Asia". The country is
            divided into seven provinces, which are Batken, Chuy, Jalal-Abad,
            Issyk-Kul, Naryn, Osh and Talas.
          </p>
        </div>
      </div>
    </div>
  );
};
