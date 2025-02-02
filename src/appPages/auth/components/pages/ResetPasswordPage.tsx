import scss from "./ResetPasswordPage.module.scss";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePatchResetPasswordMutation } from "@/redux/api/auth";
import { useState } from "react";
import logo from "@/assets/icons/logo.svg";
import Link from "next/link";

interface RegisterType {
  token: string;
  confirmPassword: string;
  newPassword: string;
}

const ResetPasswordPage = () => {
  const [PatchResetPasswordMutation] = usePatchResetPasswordMutation();

  const { register, watch, handleSubmit } = useForm<RegisterType>();

  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit: SubmitHandler<RegisterType> = async (userData) => {
    const userDataRest = {
      newPassword: userData.newPassword,
      token: userData.token,
    };

    try {
      const response = await PatchResetPasswordMutation(userDataRest);
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
    <section className={scss.ResetPasswordPage}>
      <Image src={logo} alt="LOGO" />
      <h1>Новый пароль</h1>
      <form action="">
        <input
          type="text"
          {...register("newPassword", { required: true })}
          placeholder="Пароль"
        />
        <input
          type="text"
          {...register("confirmPassword", {
            required: true,
            validate: (value: string) =>
              value === "newPassword" || "Пароли не совпадают",
          })}
          placeholder="Повторите пароль"
        />
        <button type="submit">Войти</button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
