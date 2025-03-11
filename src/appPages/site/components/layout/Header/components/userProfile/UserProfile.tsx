// components/UserProfile.tsx
import Link from "next/link";
import { Avatar, Badge, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import scss from "../../Header.module.scss";

// Пропсы для профиля пользователя
interface UserProfileProps {
  userData?: any[];
  status: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userData, status }) => {
  if (status !== "fulfilled") {
    return (
      <Link href="/auth/sign-up" className={scss.signInButton}>
        Войти
      </Link>
    );
  }

  return (
    <Link href="/profile">
      <Space direction="vertical" size={10}>
        <Badge count={1}>
          {userData?.map((user, idx) => (
            <Avatar
              key={idx}
              size={50}
              icon={
                user.user_picture ? (
                  <img
                    src={user.user_picture}
                    alt="аватар"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
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
    </Link>
  );
};