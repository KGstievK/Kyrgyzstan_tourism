import { FC } from "react";
import Image from "next/image";
import scss from "./Favorites.module.scss";
import { CiSearch } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { IoEllipseSharp } from "react-icons/io5";
import { IoEllipseOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import images from "../../../../../assets/images/Favorites/user.png";
import Balykchy from "../../../../../assets/images/Favorites/Balykchy.png";
import Ala_Archa from "../../../../../assets/images/Favorites/Ala-Archa.png";
import Son_Köl from "../../../../../assets/images/Favorites/Son-Köl.png";
import Cholpon_Ata from "../../../../../assets/images/Favorites/Cholpon-Ata.png";
import Tüp from "../../../../../assets/images/Favorites/Tüp.png";
import Canyon_Tale from "../../../../../assets/images/Favorites/Canyon Tale.png";
import Barskoon from "../../../../../assets/images/Favorites/Barskoon.png";
import Jeti_Oguz from "../../../../../assets/images/Favorites/Jeti-Oguz.png";
import Cholpon_Ata2 from "../../../../../assets/images/Favorites/Cholpon_Ata2.png";

const Favorites: FC = () => {
  return (
    <section className={scss.Favorites}>
      <div className={scss.content}>
        <div className={scss.Users_input}>
          <div className={scss.inputs}>
            <div className={scss.input_search}>
              <input type="text" />
              <CiSearch className={scss.search} />
            </div>
            <MdArrowOutward className={scss.arrow} />
          </div>
          <div className={scss.user}>
            <div className={scss.user_text}>
              <h3>Charles Deo</h3>
              <h4>Moscow, Rossia</h4>
            </div>
            <Image src={images} alt="img" width={42} height={42} />
          </div>
        </div>
        <div className={scss.favorite_content}>
          <div className={scss.text}>
            <h1>Favorites</h1>
          </div>
          <div className={scss.Favorite_images}>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image src={Balykchy} alt="img" className={scss.regions_images} />
              <div className={scss.info}>
                <h3>Balykchy</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Balykchy, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image
                src={Ala_Archa}
                alt="img"
                className={scss.regions_images}
              />
              <div className={scss.info}>
                <h3>Ala-Archa</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Kosh-Köl, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image src={Son_Köl} alt="img" className={scss.regions_images} />
              <div className={scss.info}>
                <h3>Son-Köl</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Tamchy, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image
                src={Cholpon_Ata}
                alt="img"
                className={scss.regions_images}
              />
              <div className={scss.info}>
                <h3>Cholpon-Ata</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Cholpon-Ata, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image src={Tüp} alt="img" className={scss.regions_images} />
              <div className={scss.info}>
                <h3>Tüp</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Tüp, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image
                src={Canyon_Tale}
                alt="img"
                className={scss.regions_images}
              />
              <div className={scss.info}>
                <h3>Canyon Tale</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Tüp, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image src={Barskoon} alt="img" className={scss.regions_images} />
              <div className={scss.info}>
                <h3>Barskoon</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Cholpon-Ata, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_1}>
              <div className={scss.images_likes}>
                <FcLike className={scss.like} />
              </div>
              <Image
                src={Jeti_Oguz}
                alt="img"
                className={scss.regions_images}
              />
              <div className={scss.info}>
                <h3>Jeti-Oguz</h3>
                <div className={scss.reyting}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address}>
                  <FaLocationDot /> <p>Cholpon-Ata, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
            <div className={scss.Favorite_images_block_2}>
              <div className={scss.images_likes_2}>
                <FcLike className={scss.like_2} />
              </div>
              <Image
                src={Cholpon_Ata2}
                alt="img"
                className={scss.regions_images_2}
              />
              <div className={scss.info_2}>
                <h3>Cholpon-Ata</h3>
                <div className={scss.reyting_2}>
                  <p>4.5/5</p>
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseSharp />
                  <IoEllipseOutline />
                  <span>23 764 reviews</span>
                </div>
                <div className={scss.address_2}>
                  <FaLocationDot /> <p>Cholpon-Ata, 107, Karakol 722360</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
