import { useState, useEffect } from "react";
import scss from "./VisionProfile.module.scss";
import Image from "next/image";
import edit from "@/assets/icons/Edit.svg";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetMeQuery, usePatchMeMutation } from "@/redux/api/auth";
import { useForm } from "react-hook-form";

const VisionProfile = () => {
  const [coverPreview, setCoverPreview] = useState<string | null>(null); // Для превью загруженного файла фона
  const [userPreview, setUserPreview] = useState<string | null>(null); // Для превью загруженного файла аватарки
  const { data: user } = useGetMeQuery();
  const [PatchMeRequest] = usePatchMeMutation();

  const { register, watch } = useForm<AUTH.PatchMeRequest>();

  // Отслеживаем изменения в поле загрузки файла фона
  const coverPhotoFile = watch("cover_photo");
  // Отслеживаем изменения в поле загрузки файла аватарки
  const userPhotoFile = watch("user_picture");

  // Эффект для автоматической отправки файла фона на сервер
  useEffect(() => {
    if (coverPhotoFile && coverPhotoFile[0]) {
      const file = coverPhotoFile[0] as unknown as File; // Явное приведение типа к File

      // Проверяем, что file является объектом типа File
      if (file instanceof File) {
        const previewUrl = URL.createObjectURL(file); // Создаем временный URL для превью
        setCoverPreview(previewUrl); // Устанавливаем превью

        // Создаем FormData и отправляем файл на сервер
        const formData = new FormData();
        formData.append("cover_photo", file); // Добавляем файл в FormData

        const sendFileToServer = async () => {
          try {
            const response = await PatchMeRequest(formData as unknown as AUTH.PatchMeRequest);
            if (response.data) {
              console.log("Фото фона успешно загружено!");
              // Если сервер возвращает новый URL, можно обновить состояние
              // setCoverPreview(response.data.cover_photo); // Пример, если сервер возвращает URL
            }
          } catch (e) {
            console.error("Ошибка при загрузке фото фона:", e);
            setCoverPreview(null); // Сбрасываем превью в случае ошибки
          }
        };

        sendFileToServer();
      } else {
        console.error("Выбранный объект не является файлом.");
      }
    }
  }, [coverPhotoFile, PatchMeRequest]);

  // Эффект для автоматической отправки файла аватарки на сервер
  useEffect(() => {
    if (userPhotoFile && userPhotoFile[0]) {
      const file = userPhotoFile[0] as unknown as File; // Явное приведение типа к File

      // Проверяем, что file является объектом типа File
      if (file instanceof File) {
        const previewUrl = URL.createObjectURL(file); // Создаем временный URL для превью
        setUserPreview(previewUrl); // Устанавливаем превью

        // Создаем FormData и отправляем файл на сервер
        const formData = new FormData();
        formData.append("user_picture", file); // Добавляем файл в FormData

        const sendFileToServer = async () => {
          try {
            const response = await PatchMeRequest(formData as unknown as AUTH.PatchMeRequest);
            if (response.data) {
              console.log("Аватарка успешно загружена!");
              // Если сервер возвращает новый URL, можно обновить состояние
              // setUserPreview(response.data.user_picture); // Пример, если сервер возвращает URL
            }
          } catch (e) {
            console.error("Ошибка при загрузке аватарки:", e);
            setUserPreview(null); // Сбрасываем превью в случае ошибки
          }
        };

        sendFileToServer();
      } else {
        console.error("Выбранный объект не является файлом.");
      }
    }
  }, [userPhotoFile, PatchMeRequest]);

  return (
    <section className={scss.VisionProfile}>
      {user?.map((el) => (
        <div className={scss.content} key={el.id}>
          {/* Блок для фона профиля */}
          <div
            className={scss.cover}
            style={{
              backgroundImage: coverPreview
                ? `url(${coverPreview})`
                : el.cover_photo
                ? `url(${el.cover_photo})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Input для загрузки нового фона профиля */}
            <label className={scss.EditCover}>
              Edit Cover Photo
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                {...register("cover_photo")}
              />
            </label>
          </div>

          {/* Блок для аватарки и информации о пользователе */}
          <div className={scss.EditImage}>
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <label>
                  <Avatar
                    size={121}
                    icon={
                      userPreview ? (
                        <img src={userPreview} alt="avatar" />
                      ) : el.user_picture ? (
                        <img src={el.user_picture} alt="avatar" width={120} height={200} />

                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    {...register("user_picture")}
                  />
                </label>
              </Space>
            </Space>
            <div className={scss.userName}>
              <h1>
                {el.first_name} {el.last_name}
              </h1>
              <p>{!el.from_user ? "Страна, город" : el.from_user}</p>
            </div>
          </div>

          {/* Кнопка для редактирования (если нужна) */}
          <button className={scss.EditFrom}>
            <Image src={edit} alt="edit" />
          </button>
        </div>
      ))}
    </section>
  );
};

export default VisionProfile;