"use client";
import scss from "./SignInPage.module.scss";
import { usePostLoginMutation } from "@/redux/api/auth";
import { ConfigProvider, Switch } from "antd";
import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


interface signInProps {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const [postLoginMutation] = usePostLoginMutation();
  const { register, handleSubmit } = useForm<AUTH.PostLoginRequest>();
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const onSubmit: SubmitHandler<AUTH.PostLoginRequest> = async (userData) => {
    const datalogin = {
      email: userData.email,
      password: userData.password,
    };
    try {
      const response = await postLoginMutation(datalogin);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
      }

      window.location.reload();
      console.log(response.data);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };
  return (
    <section className={scss.LoginPage}>
      <h1 className={scss.authTitle}>Sign ip</h1>
      <h2>Создать аккаунт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <div className={scss.links}>
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
          <Link href="/auth/forgot" className={scss.link}>
            Забыли пароль?
          </Link>
        </div>
        <button type="submit">Войти</button>
      </form>
      {/* <div className={scss.orLine}>
        <div className={scss.line}></div>
        <p>или</p>
        <div className={scss.line}></div>
      </div>
      <div className={scss.google}>
        <button className={scss.link} onClick={() => signIn("google")}>
          <Image src={google} alt="Google" />
        </button>
      </div> */}
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
