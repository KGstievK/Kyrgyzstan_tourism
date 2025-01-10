"use client";
import { FC, useState } from "react";
import scss from "./AddHotel.module.scss";
import { close, createImage, edit, remove } from "../icons";
import Image from "next/image";
import Create_image from "@/assets/icons/Create_Image.svg";

interface AddHotelProps {
  _id?: number;
  image: string;
}

const AddHotel: FC= () => {
  const infoProduct = ["name", "price", "discount", "article"];
  

  const [AddHotel, setAddHotel] = useState(
    infoProduct.reduce((acc, el) => ({ ...acc, [el]: "" }), {})
  );
  // const [create, setCreate] = useState(false)
  // const [edited, setEdited] = useState(false)
  // const [product, setProduct] = useState(null)
  const [images, setImages] = useState<AddHotelProps[]>([]);
  // const [forDeleteImages, setForDeleteImages] = useState<AddHotelProps[]>([])

  const [imageEditId, setImageEditId] = useState<AddHotelProps | number>(0);

  const addNewImage = (e: any) => {
    const files = e.target.files[0];
    if (files) {
      const object = {
        imageLink: URL.createObjectURL(files),
        image: files,
        id: Date.now(),
      };
      setImages([...images, object]);
    }
  };

  const deleteImage = (id: number) => {
    const deletedImage = images.filter((image) => image._id !== id);
    setImages(deletedImage);
  };

  const editImage = (e: any) => {
    const files = e.target.files[0];
    if (files) {
      const editedImage = images.map((el) =>
        el._id === imageEditId
          ? { ...el, image: files, imageLink: URL.createObjectURL(files) }
          : el
      );
      setImages(editedImage);
      setImageEditId(0);
    }
  };

  return (
    <section className={scss.AddHotel}>
      <div className="container">
        <div className={scss.content}>
          <form action="">
            <div className={scss.Product}>
              <button className={scss.cancel} onClick={() => {}}>
                cancel
              </button>
              <div className={scss.Product_image}>
                <h2>Фотографии продукта</h2>
                <div className={scss.images}>
                  <div className={scss.images_size}>
                    <button onClick={() => {}} className={scss.images__remove}>
                      {remove}
                    </button>
                    <label
                      onClick={() => {}}
                      htmlFor="editInput"
                      className={scss.editInput}
                    >
                      {edit}
                    </label>

                    <Image src='' alt="Image" />
                  </div>
                  <input
                    onChange={(e) => editImage(e)}
                    type="file"
                    id="editInput"
                  />
                  <div className={scss.images__block}>
                    <label htmlFor="addInput">{close}</label>
                    <input
                      onChange={(e) => addNewImage(e)}
                      type="file"
                      id="addInput"
                    />
                  </div>
                </div>
              </div>
              <div className={scss.Product_name}>
                {infoProduct.map(
                  (el) =>
                    el !== "description" && (
                      <input
                        key={el}
                        type="text"
                        name={el}
                        onChange={(e) =>
                          setAddHotel({
                            ...AddHotel,
                            [e.target.name]: e.target.value,
                          })
                        }
                        placeholder={el}
                      />
                    )
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddHotel;
