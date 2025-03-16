// components/UserProfile.tsx
import Link from "next/link";
import { Avatar, Badge, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import scss from "../../Header.module.scss";
import Image from "next/image";

// Импортируем тип из Header
import { UserDataType } from "../../Header";

// Пропсы для профиля пользователя
interface UserProfileProps {
  userData?: UserDataType;
  status: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userData, status }) => {
  if (status !== "fulfilled") {
    return (
      <Link href="/auth/sign-in" className={scss.signInButton}>
        Войти
      </Link>
    );
  }

  // Проверяем, является ли userData массивом и обрабатываем соответственно
  return (
    <Link href="/profile">
      <Space direction="vertical" size={10}>
        <Badge count={1}>
          {Array.isArray(userData) ? (
            // Если это массив, используем map
            userData.map((user, idx) => (
              <Avatar
                key={idx}
                size={50}
                icon={
                  user.user_picture ? (
                    <span style={{ 
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '50%', 
                      overflow: 'hidden', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    }}>
                      <Image
                        src={user.user_picture}
                        alt="аватар"
                        width={50}
                        height={50}
                        style={{
                          objectFit: "cover",
                        }}
                        unoptimized={true} // Добавляем для внешних URL
                      />
                    </span>
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            ))
          ) : (
            // Если не массив, обрабатываем как объект
            <Avatar
              size={50}
              icon={
                userData?.user_picture ? (
                  <span style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}>
                    <Image
                      src={userData.user_picture}
                      alt="аватар"
                      width={50}
                      height={50}
                      style={{
                        objectFit: "cover",
                      }}
                      unoptimized={true} // Добавляем для внешних URL
                    />
                  </span>
                ) : (
                  <UserOutlined />
                )
              }
            />
          )}
        </Badge>
      </Space>
    </Link>
  );
};