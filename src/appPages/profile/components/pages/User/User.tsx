import { Avatar, Badge, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import scss from "./User.module.scss";
import { useGetMeQuery } from "@/redux/api/auth";
import { useState } from "react";

const User = () => {
  const { data: user } = useGetMeQuery();
  const [userPreview, setUserPreview] = useState<string | null>(null);

  return (
    <section className={scss.User}>
      <div className={scss.content}>
        <div className={scss.UserTitle}>
          {user?.map((el) => (
            <div key={el.id}>
              <h1>{el.first_name}</h1>
              <p>{el.phone_number}</p>
            </div>
          ))}
        </div>
        <Space direction="vertical" size={20}>
          <Space wrap size={20}>
            <Badge count={1}>
              {user?.map((el) => (
                <Avatar key={el.id}
                  size={47}
                  icon={
                    userPreview ? (
                      <img src={userPreview} alt="avatar" style={{
                        objectFit: 'cover',
                        top: '0',
                        right: '0',
                        borderRadius: '50%'
                      }} />
                    ) : el.user_picture ? (
                      <img
                        src={el.user_picture}
                        alt="avatar"
                        width={100}
                        height={100}
                        style={{
                          objectFit: 'cover',
                          top: '0',
                          right: '0',
                          borderRadius: '50%'
                        }}
                      />
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              ))}
            </Badge>
          </Space>
        </Space>
      </div>
    </section>
  );
};

export default User;
