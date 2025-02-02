"use client";
import scss from "./Profile.module.scss";
import { useGetMeQuery, usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider, Avatar } from "antd";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import SearchProfile from "./SearchProfile/SearchProfile";
import User from "./User/User";
;


const Profile: FC = () => {
  const [tab, setTab] = useState(false);

  const [avatarImage, setAvatarImage] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const [avatarSelect, setAvatarSelect] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const handlerAvatarChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
     setAvatarSelect(e.target.files[0])
    } else {
      console.error("Is Not a File");
    }
  }
  const handlerCoverChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
     setCover(e.target.files[0])
    } else {
      console.error("Is Not a File");
    }
  }


  const [postRegisterMutation] = usePostRegistrationMutation();
  const {data: user} = useGetMeQuery()
  console.log("🚀 ~ user:", user?.map((el) => el.id))
  

  const { register, watch, handleSubmit } = useForm<AUTH.PatchMeRequest>();

  
  const onSubmit: SubmitHandler<AUTH.PatchMeRequest> = async (userData) => {
    const formData = new FormData()
    formData.append('avatar', avatarSelect)

    const userDataRest = {
      user_picture: formData,
      email: userData.email,
      cover_photo: userData.cover_photo,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
    };

    try {
      const response = await postRegisterMutation(userDataRest);
      if (response.data) {
       
        // window.location.reload();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <section className={scss.Profile}>
      <div className={scss.headerUser}>
        <SearchProfile/>
        <User/>
      </div>

      <h2>Создать аккаунт</h2>
      {
        user?.map((el) => (
          <div className={scss.ProfileCover}>
            <Image src={el.cover_photo} alt="Cover" />

          </div>
        ))
      }
      {!tab ? 
      <form>
      {user?.map((el) => (
        <>
          
          <h3>{el?.email}</h3>
          <div className={scss.userName}>
            <p>
              Name
            </p>
            <p>
              Surname
            </p>
            <h3>{el?.first_name}</h3>
            <h3>{el?.last_name}</h3>
            <p>
              Phone number
            </p>
            <p>
              Birth date
            </p>
            <h3>{el?.phone_number}</h3>
            <h3>
              {el?.birth_date} 
            </h3>
          </div>
          <button onClick={() => setTab(!tab)}>Редактировать</button>
        </>))}
      </form> : 
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
      }
      
    </section>
  );
};
export default Profile;

