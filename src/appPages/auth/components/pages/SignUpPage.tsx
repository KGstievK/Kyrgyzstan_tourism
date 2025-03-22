"use client";
import scss from "./SignUpPage.module.scss";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { ConfigProvider, Input, Select, Space, Switch } from "antd";
import { FC, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Link from "next/link";

const options = [
  {
    value: "+996",
    label: "+996",
  },
  {
    value: "+7",
    label: "+7",
  },
];

const SignUpPage: FC = () => {
  const [postRegisterMutation] = usePostRegistrationMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [countryCode, setCountryCode] = useState("+996");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AUTH.PostRegistrationRequest>();

  const onSubmit: SubmitHandler<AUTH.PostRegistrationRequest> = async (
    userData
  ) => {
    if (Object.keys(errors).length > 0) {
      setModalMessage("Пожалуйста, заполните все обязательные поля.");
      setShowModal(true);
      return;
    }

    const fullPhoneNumber = `${countryCode}${userData.phone_number}`;

    const dataRegistr = {
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirm_password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone_number: fullPhoneNumber,
      birth_date: userData.birth_date,
    };

    try {
      const response = await postRegisterMutation(dataRegistr);
      if (response.data?.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("accessToken", JSON.stringify(response.data));
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
  };

  return (
    <section className={scss.RegistrationPage}>
      <h1 className={scss.authTitle}>Sign up</h1>
      <h2>Создать аккаунт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={scss.castomInput}
          type="email"
          {...register("email", { required: "Email обязателен" })}
          placeholder="Email"
        />
        {errors.email && (
          <span className={scss.error}>{errors.email.message}</span>
        )}

        <Input.Password
          className={scss.castomInput}
          {...register("password", { required: "Пароль обязателен" })}
          placeholder="Пароль"
        />
        {errors.password && (
          <span className={scss.error}>{errors.password.message}</span>
        )}

        <Input.Password
          className={scss.castomInput}
          {...register("confirm_password", {
            required: "Подтверждение пароля обязательно",
          })}
          placeholder="Повторите пароль"
        />
        {errors.confirm_password && (
          <span className={scss.error}>{errors.confirm_password.message}</span>
        )}

        <div className={scss.userName}>
          <p>
            Name <span>*</span>{" "}
            {errors.first_name && (
              <span className={scss.error}>{errors.first_name.message}</span>
            )}
          </p>
          <p>
            Surname <span>*</span>{" "}
            {errors.last_name && (
              <span className={scss.error}>{errors.last_name.message}</span>
            )}
          </p>
          <Input
            className={scss.castomInput}
            type="text"
            {...register("first_name", { required: "Имя обязательно" })}
            placeholder="Name"
          />
          <Input
            className={scss.castomInput}
            type="text"
            {...register("last_name", { required: "Фамилия обязательна" })}
            placeholder="Surname"
          />

          <p>
            Phone number <span>*</span>{" "}
            {errors.phone_number && (
              <span className={scss.error}>{errors.phone_number.message}</span>
            )}
          </p>
          <p>
            Birth date <span>*</span>{" "}
            {errors.birth_date && (
              <span className={scss.error}>{errors.birth_date.message}</span>
            )}
          </p>

          <Space direction="vertical">
            <Space.Compact>
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      colorPrimary: "#407EC7",
                      colorBorder: "#transparent",
                      controlOutline: "none",
                      controlItemBgHover: "transparent",
                      controlItemBgActive: "transparent", 
                    },
                  },
                }}
              >
                <Select
                  className={scss.castomSelect} 
                  defaultValue="+996"
                  options={options}
                  onChange={handleCountryCodeChange}
                />
              </ConfigProvider>
              <Controller
                name="phone_number"
                control={control}
                rules={{
                  required: "Номер телефона обязателен",
                  pattern: {
                    value: /^\d{9}$/,
                    message: "Номер телефона должен содержать 9 цифр",
                  },
                }}
                render={({ field }) => (
                  <Input
                    className={scss.castomInput}
                    type="tel"
                    placeholder="XXX XXX XXX"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value); 
                    }}
                  />
                )}
              />
            </Space.Compact>
          </Space>
          <Input
            className={scss.castomInput}
            type="date"
            {...register("birth_date", {
              required: "Дата рождения обязательна",
            })}
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

      {showModal && (
        <div className={scss.modalOverlay}>
          <div className={scss.modalContent}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUpPage;
