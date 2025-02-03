import { useState } from 'react';
import scss from './VisionProfile.module.scss'
import Image from 'next/image';
import edit from '@/assets/icons/Edit.svg';
import { Avatar, Badge, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useGetMeQuery, usePatchMeMutation } from '@/redux/api/auth';
import { SubmitHandler } from 'react-hook-form';

const VisionProfile = () => {
  const [avatarImage, setAvatarImage] = useState([]);
    const [coverImage, setCoverImage] = useState([]);
    const [avatarSelect, setAvatarSelect] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);

    const {data: user} = useGetMeQuery()
    console.log("🚀 ~ VisionProfile ~ user:", user?.map((el) => el))
    const [PatchMeRequest] = usePatchMeMutation()
  
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

     const onSubmit: SubmitHandler<AUTH.PatchMeRequest> = async (userData) => {
        // const formData = new FormData()
        // formData.append('avatar', avatarSelect)
    
        const userDataRest = {
          from_user: userData.from_user!,
        };
    
        try {
          const response = await PatchMeRequest(userDataRest);
          if (response.data) {
            // window.location.reload();
          }
        } catch (e) {
          console.error("An error occurred:", e);
        }
      };
  return (
    <section className={scss.VisionProfile}>
            {
              user?.map((el) => (
        <div className={scss.content} key={el.id}>
          <div className={scss.cover} style={{
            background: !el.cover_photo ? '' : el.cover_photo
          }}>
            <button className={scss.EditCover}>Edit Cover Photo</button>
          </div>
                <div className={scss.EditImage}>
                  <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                        <Avatar size={121} icon={!el.user_picture ? <UserOutlined /> : el.user_picture} />
                    </Space>
                  </Space>
                  <div className={scss.userName}>
                    <h1>{el.first_name} {el.last_name}</h1>
                    <p>{!el.from_user ? 'Страна, город' : el.from_user}</p>
                  </div>
                </div>
          <button className={scss.EditFrom}>
            <Image src={edit} alt="edit" />
          </button>
        </div>
              ))
            }
    </section>
  )
}

export default VisionProfile