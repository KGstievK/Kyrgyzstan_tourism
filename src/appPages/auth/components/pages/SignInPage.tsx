"use client";
import scss from "./SignInPage.module.scss";
import { usePostLoginMutation } from "@/redux/api/auth";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { ConfigProvider } from "antd";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import logo from "@/assets/icons/logo.svg";
import google from "@/assets/icons/google.svg";
import { signIn } from "next-auth/react";

const SignInPage: FC = () => {
  const [postLoginMutation] = usePostLoginMutation();
  const { register, handleSubmit } = useForm<AUTH.PostLoginRequest>();
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
  };

  const onSubmit: SubmitHandler<AUTH.PostLoginRequest> = async (userData) => {
    // const datalogin = {
    // username: userData.email,
    // password: userData.password1
    // }
    try {
      const response = await postLoginMutation(userData);
      // const responseToken = await refreshAccessToken(userData)
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        // storage.setItem(
        //   "access",
        //   JSON.stringify(response.data.access)
        // );
        storage.setItem("access", JSON.stringify(response.data.access));
      }

      // window.location.reload();
      console.log(response.data);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  return (
    <section className={scss.LoginPage}>
      <Link href="/">
        <Image src={logo} alt="LOGO" />
      </Link>
      <h1>Войти в аккаунт</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="User Name"
          {...register("username", { required: true })}
        />
        {/* <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        /> */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <div className={scss.links}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "transparent", // Основной цвет
                colorBorder: "#000", // Цвет границы
              },
            }}
          >
            <Checkbox
              className={scss.customCheckbox}
              onChange={handleRememberMeChange}
            >
              Сохранить вход
            </Checkbox>
          </ConfigProvider>
          <Link href="/auth/forgot" className={scss.link}>
            Забыли пароль?
          </Link>
        </div>
        <button type="submit">Войти</button>
      </form>
      <div className={scss.orLine}>
        <div className={scss.line}></div>
        <p>или</p>
        <div className={scss.line}></div>
      </div>
      <div className={scss.google}>
        <button className={scss.link} onClick={() => signIn("google")}>
          <Image src={google} alt="Google" />
        </button>
      </div>
      <div className={scss.nav}>
        <p>У вас нет аккаунта?</p>
        <Link href="/auth/sign-up" className={scss.link}>
          Зарегестрироваться
        </Link>
      </div>
    </section>
  );
};

export default SignInPage;
