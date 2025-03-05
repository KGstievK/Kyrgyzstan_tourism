// components/UserAvatar.tsx
import { Avatar, Badge, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

interface UserAvatarProps {
  userData: any;
  userPreview: string | null;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ userData, userPreview }) => (
  <Link href="/profile">
    <Space direction="vertical" size={10}>
      <Space wrap size={10}>
        <Badge count={1}>
          {userData?.map((el, idx) => (
            <Avatar
              key={idx}
              size={50}
              icon={
                userPreview ? (
                  <img src={userPreview} alt="avatar" />
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
  </Link>
);