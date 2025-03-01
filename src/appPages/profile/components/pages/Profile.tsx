"use client";
import scss from "./Profile.module.scss";
import { useGetMeQuery, usePatchMeMutation } from "@/redux/api/auth";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import SearchProfile from "./SearchProfile/SearchProfile";
import User from "./User/User";
import VisionProfile from "./VisionProfile/VisionProfile";
const Profile: FC = () => {
  const [tab, setTab] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [userImage, setUserImage] = useState("");

  const [PatchMeRequest] = usePatchMeMutation();
  const { data: user } = useGetMeQuery();
  console.log(
    "🚀 ~ user:",
    user?.map((el) => el)
  );

  const { register, watch, handleSubmit } = useForm<AUTH.PatchMeRequest>();

  const onSubmit: SubmitHandler<AUTH.PatchMeRequest> = async (userData) => {
    const userDataRest = {
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
    };

	

    try {
      const response = await PatchMeRequest(userDataRest);
      if (response.data) {
        window.location.reload();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <section className={scss.Profile}>
      <div className={scss.headerUser}>
        <SearchProfile />
        <User />
      </div>
      <h2 className="title">Создать аккаунт</h2>
      <div className={scss.ProfileCover}>
        <VisionProfile />
      </div>
      {!tab ? (
        <>
        {user?.map((el, index) => (
        <form key={el.id || index}>
            <>
              <h3>{el?.email}</h3>
              <div className={scss.userName}>
                <p>Name</p>
                <p>Surname</p>
                <h3>{el?.first_name}</h3>
                <h3>{el?.last_name}</h3>
                <p>Phone number</p>
                <p>Birth date</p>
                <h3>{el?.phone_number}</h3>
                <h3>{el?.birth_date}</h3>
              </div>
              <button onClick={() => setTab(!tab)}>Редактировать</button>
            </>
        </form>
          ))}
        </>
      ) : (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <div className={scss.userName}>
            <p>
              Name <span>*</span>
            </p>
            <p>
              Surname <span>*</span>
            </p>
            <input
              type="text"
              {...register("first_name", { required: true })}
              placeholder="Name"
            />
            <input
              type="text"
              {...register("last_name", { required: true })}
              placeholder="Surname"
            />
            <p>
              Phone number <span>*</span>
            </p>
            <p>
              Birth date <span>*</span>
            </p>
            <input
              type="text"
              {...register("phone_number", { required: true })}
              placeholder="Phone number"
            />
            <input
              type="date"
              {...register("birth_date", { required: true })}
              placeholder="Birth date"
            />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      )}
    </section>
  );
};
export default Profile;
