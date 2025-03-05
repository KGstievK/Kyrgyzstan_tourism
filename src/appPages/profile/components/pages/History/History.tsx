import { FC } from "react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import scss from "./History.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { IoLaptopOutline } from "react-icons/io5";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { TfiArrowTopRight } from "react-icons/tfi";
import { MdOutlineMailOutline } from "react-icons/md";
import hotel from "@/assets/images/History/Hotel.png";
import hotel1 from "@/assets/images/History/Hotel1.png";
import SearchProfile from "../SearchProfile/SearchProfile";
import User from "../User/User";
import { useGetUserCommentsQuery } from "@/redux/api/auth";

const History: FC = () => {
  const { data: userComments, isLoading, error } = useGetUserCommentsQuery();

  return (
    <section className={scss.History}>
      <div className={scss.headerUser}>
        <SearchProfile />
        <User />
      </div>

      <div className={scss.history_content}>
        <div className={scss.text}>
          <h1>Review {userComments?.length || 0}</h1>
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
                  <LuPhone className={scss.leptop} /> +996 555 400 270
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
                    <TfiArrowTopRight />
                  </div>
                  <div className={scss.email}>
                    <MdOutlineMailOutline className={scss.leptop} /> Email
                    <TfiArrowTopRight />
                  </div>
                </div>
                <div className={scss.phone}>
                  <LuPhone className={scss.leptop} /> +996 555 400 270
                </div>
              </div>
              <p>Edit this directory object</p>
            </div>
          </div>
        </div>
      </div>

      <div className={scss.comentary}>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading comments</div>
        ) : !userComments || userComments.length === 0 ? (
          <div>No comments available</div>
        ) : (
          <div className={scss.people}>
            {userComments.map((comment) => {
              // Определяем, относится ли отзыв к отелю или кухне
              const isHotelReview = !!comment.client_hotel;
              const client = comment.client_hotel || comment.client_kitchen;
              const title = comment.hotel || comment.kitchen_region || "Untitled";
              const images = comment.hotel_review_image || comment.kitchen_review_image || [];
              const date = comment.created_date || comment.created_at || "Unknown date";

              return (
                <div key={comment.id} className={scss.person}>
                  <div className={scss.person_image}>
                    <Image
                      src={client?.user_picture || "/default-user.png"}
                      alt="User"
                      width={42}
                      height={42}
                      className={scss.person_imagess}
                    />
                    <div className={scss.person_text}>
                      <h3>{client ? `${client.first_name} ${client.last_name}` : "Anonymous"}</h3>
                      <p>{client?.from_user || "Unknown location"}</p>
                    </div>
                    <div className={scss.likes}>
                      <BiLike /> {comment.rating || 0}
                    </div>
                  </div>

                  <div className={scss.text}>
                    <p>{new Date(date).toLocaleDateString()}</p>
                    <h5>{title}</h5>
                    <span>{comment.comment}</span>
                    {images.length > 0 && (
                      <div className={scss.imagess_2}>
                        {images.map((img, index) => (
                          <Image
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_API_URL}${img.image}`} // Добавляем базовый URL
                            alt={`review-image-${index}`}
                            width={100}
                            height={100}
                            className={scss.images_1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;