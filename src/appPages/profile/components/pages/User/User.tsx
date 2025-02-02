import { Avatar, Badge, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import scss from './User.module.scss'
import { useGetMeQuery } from '@/redux/api/auth';

const User = () => {
  const {data: user} = useGetMeQuery()
  
  return (
    <section className={scss.User}>
      <div className={scss.content}>
        <div className={scss.UserTitle}>
          {
            user?.map((el) => (
              <>
                <h1>{el.first_name}</h1>
                <p>{el.phone_number}</p>
              </>
            ))
          }
        </div>  
        <Space direction="vertical" size={16}>

          <Space wrap size={16}>
            <Badge count={1}>
              <Avatar size={47} icon={<UserOutlined />} />
            </Badge>
          </Space>
        </Space>
      </div>
    </section>
  )
}

export default User