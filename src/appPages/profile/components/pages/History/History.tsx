import { FC } from "react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import scss from "./History.module.scss";
// import { CiSearch } from "react-icons/ci";
// import { MdArrowOutward } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoLaptopOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TfiArrowTopRight } from "react-icons/tfi";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import hotel from "@/assets/images/History/Hotel.png";
import hotel1 from "@/assets/images/History/Hotel1.png";
import images from "../../../../../assets/images/History/user.png";
import images1 from "../../../../../assets/images/History/Anna.png";
import images2 from "../../../../../assets/images/History/img1.png";
import images3 from "../../../../../assets/images/History/img2.png";
import images4 from "../../../../../assets/images/History/img3.png";
import SearchProfile from "../SearchProfile/SearchProfile";
import User from "../User/User";

const History: FC = () => {
  return (
    <section className={scss.History}>
        <div className={scss.headerUser}>
          <SearchProfile />
          <User />
        </div>
        <div className={scss.history_content}>
          <div className={scss.text}>
            <h1>Review 35</h1>
            <div className={scss.arrows}>
              <FaArrowLeftLong />
              <FaArrowRightLong />
            </div>
          </div>
        </div>
        <div className={scss.Hotels}>
          <div className={scss.hotel}>
            <h1>Hotel Amir</h1>
            <div className={scss.hotel_images}>
              <Image src={hotel} alt="img" className={scss.images_hotelss} />
              <div className={scss.addresses}>
                <h5>Location and contact details</h5>
                <div className={scss.address}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11692.943248611515!2d74.60490565!3d42.888971250000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1735901698190!5m2!1sru!2skg"
                    loading="lazy"
                  ></iframe>
                  <div className={scss.location}>
                    <IoLocationSharp className={scss.location_1} />
                    <p>
                      107 Przhevalsky str., Karakol 722360 Kyrgyzstan
                      <TfiArrowTopRight className={scss.leptop} />
                    </p>
                  </div>
                  <div className={scss.contact}>
                    <div className={scss.leptops}>
                      <IoLaptopOutline className={scss.leptop} /> Website
                      <TfiArrowTopRight />
                    </div>
                    <div className={scss.email}>
                      <MdOutlineMailOutline className={scss.leptop} /> Email
                      <TfiArrowTopRight />
                    </div>
                  </div>
                  <div className={scss.phone}>
                    <LuPhone className={scss.leptop} />
                    +996 555 400 270
                  </div>
                </div>
                <p>Edit this directory object</p>
              </div>
            </div>
          </div>
          <div className={scss.hotel_2}>
            <h1>Hotel Amir</h1>
            <div className={scss.hotel_images_2}>
              <Image src={hotel1} alt="img" className={scss.images_hotelss_2} />
              <div className={scss.addresses_2}>
                <h5>Location and contact details</h5>
                <div className={scss.address_2}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11692.943248611515!2d74.60490565!3d42.888971250000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skg!4v1735901698190!5m2!1sru!2skg"
                    loading="lazy"
                  ></iframe>
                  <div className={scss.location}>
                    <IoLocationSharp className={scss.location_1} />
                    <p>
                      107 Przhevalsky str., Karakol 722360 Kyrgyzstan
                      <TfiArrowTopRight className={scss.leptop} />
                    </p>
                  </div>
                  <div className={scss.contact}>
                    <div className={scss.leptops}>
                      <IoLaptopOutline className={scss.leptop} /> Website
                      <TfiArrowTopRight className={scss.leptop} />
                    </div>
                    <div className={scss.email}>
                      <MdOutlineMailOutline className={scss.leptop} /> Email
                      <TfiArrowTopRight className={scss.leptop} />
                    </div>
                  </div>
                  <div className={scss.phone}>
                    <LuPhone className={scss.leptop} />
                    +996 555 400 270
                  </div>
                </div>
                <p>Edit this directory object</p>
              </div>
            </div>
          </div>
        </div>
        <div className={scss.comentary}>
          <div className={scss.people}>
            <div className={scss.person}>
              <div className={scss.person_image}>
                <Image src={images} alt="img" className={scss.person_imagess} />
                <div className={scss.person_text}>
                  <h3>Charles Deo</h3>
                  <p>Moscow, Rossia</p>
                </div>
              </div>
              <div className={scss.text}>
                <p>July 10, 2023</p>
                <h5>Issyk-Kul - the Pearl of Kyrgyzstan</h5>
                <span>
                  I have just returned from an unforgettable trip to Issyk-Kul,
                  and I cannot help but share my impressions. This place is
                  simply magical! Let me start with the lake itself. Issyk-Kul
                  turned out to be incredibly beautiful and tranquil.
                </span>
              </div>
            </div>
            <div className={scss.person_2}>
              <div className={scss.person_image_2}>
                <Image src={images1} alt="img" width={42} height={42} />
                <div className={scss.person_text_2}>
                  <h3>Anna Petrova</h3>
                  <p>Moscow, Rossia</p>
                </div>
                <div className={scss.likes}>
                  <BiLike /> 0
                </div>
              </div>
              <div className={scss.text_2}>
                <p>July 10, 2023</p>
                <h5>Issyk-Kul - the Pearl of Kyrgyzstan</h5>
                <span>
                  I have just returned from an unforgettable trip to Issyk-Kul,
                  and I cannot help but share my impressions. This place is
                  simply magical! Let me start with the lake itself. Issyk-Kul
                  turned out to be incredibly beautiful and tranquil.
                </span>
                <div className={scss.imagess_2}>
                  <Image src={images2} alt="img" className={scss.images_1} />
                  <Image src={images3} alt="img" className={scss.images_1} />
                  <Image src={images4} alt="img" className={scss.images_1} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default History;
