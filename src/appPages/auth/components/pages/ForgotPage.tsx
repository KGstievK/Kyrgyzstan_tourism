import Image from "next/image";
import scss from "./ForgotPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostForgotPasswordMutation } from "@/redux/api/auth";
import { useState } from "react";
import logo from "@/assets/icons/logo.svg";
import Link from "next/link";

interface RegisterType {
  email: string;
  frontEndUrl: string;
}

const ForgotPage = () => {
  const [PostForgotPasswordMutation] = usePostForgotPasswordMutation();

  const { register, watch, handleSubmit } = useForm<RegisterType>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<RegisterType> = async (userData) => {
    const userDataRest = {
      email: userData.email,
      frontEndUrl: userData.frontEndUrl,
    };

    try {
      const response = await PostForgotPasswordMutation(userDataRest);
      if (response.data) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
        // window.location.reload();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <section className={scss.ForgotPage}>
      <Image src={logo} alt="LOGO" />
      <h1>Забыли пароль?</h1>
      <form action="">
        <input
          type="text"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <button type="submit">Войти</button>
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

export default ForgotPage;
