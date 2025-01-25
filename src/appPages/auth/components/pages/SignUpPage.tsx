"use client";
import scss from "./SignUpPage.module.scss";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider } from "antd";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { Switch } from "antd";
import Link from "next/link";
import Image from "next/image";
// import logo from "@/assets/icons/logo.svg";
// import google from "@/assets/icons/google.svg";
// import { signIn } from "next-auth/react";

interface SignUpProps {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date: string;
}

const SignUpPage: FC = () => {
  const [postRegisterMutation] = usePostRegistrationMutation();

  const { register, watch, handleSubmit } =
    useForm<AUTH.PostRegistrationRequest>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<SignUpProps> = async (userData) => {
    const userDataRest = {
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirm_password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
    };

    try {
      const response = await postRegisterMutation(userDataRest);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data.access));
        // window.location.reload();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const password = watch("password");
  return (
    <section className={scss.RegistrationPage}>
      <h1 className={scss.authTitle}>Sign up</h1>
      <h2>Создать аккаунт</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            required: true,
            validate: (value: string) =>
              value === "password" || "Пароли не совпадают",
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
            type="text"
            {...register("birth_date", { required: true })}
            placeholder="Birth date"
          />
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "407EC7", // Основной цвет
              colorBorder: "#000", // Цвет границы
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

{
  /* <div className={scss.orLine}>
  <div className={scss.line}></div>
  <p>или</p>
  <div className={scss.line}></div>
</div> */
}
{
  /* <div className={scss.google}>
  <button className={scss.Google_link} onClick={() => signIn("google")}>
    <Image src={google} alt="Google" />
  </button>
</div> */
}
