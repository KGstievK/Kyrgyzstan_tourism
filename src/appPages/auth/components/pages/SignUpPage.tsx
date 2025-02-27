"use client";
import scss from "./SignUpPage.module.scss";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider } from "antd";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Switch } from "antd";
import Link from "next/link";

const SignUpPage: FC = () => {
  const [postRegisterMutation] = usePostRegistrationMutation();

  const { register, handleSubmit } = useForm<AUTH.PostRegistrationRequest>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<AUTH.PostRegistrationRequest> = async (
    userData
  ) => {
    const dataRegistr = {
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirm_password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
    };
    try {
      const response = await postRegisterMutation(dataRegistr);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
        // window.location.reload();
        console.log(response.data);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  return (
    <section className={scss.RegistrationPage}>
      <h1 className={scss.authTitle}>Sign up</h1>
      <h2>Создать аккаунт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <input
          type="text"
          {...register("password", { required: true })}
          placeholder="Пароль"
        />
        <input
          type="text"
          {...register("confirm_password", {
            required: true
          })}
          placeholder="Повторите пароль"
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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "407EC7",
              colorBorder: "#000",
            },
          }}
        >
          <Switch
            className={scss.customCheckbox}
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </ConfigProvider>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <div className={scss.links}>
        <p>У вас уже есть аккаунт?</p>
        <Link href="/auth/sign-in" className={scss.link}>
          Войти
        </Link>
      </div>
    </section>
  );
};
export default SignUpPage;
