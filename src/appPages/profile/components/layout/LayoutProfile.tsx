import { usePathname } from "next/navigation";
import scss from "./LayoutProfile.module.scss";
import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import SearchProfile from "../pages/SearchProfile/SearchProfile";
import { User } from "lucide-react";

interface LayoutProfileProps {
  children: ReactNode;
}


interface pathProps {
  label: string
  path: string
}

const LayoutProfile: FC<LayoutProfileProps> = ({ children }) => {
  const [path, setPath] = useState<pathProps>()
  const pathname = usePathname();
  const tabs = [
    { label: "Профиль", path: "/profile" },
    { label: "Комментарии", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "" },
  ];
  const tabsMobile = [
    { label: "Профиль", path: "/profile" },
    { label: "Личный Кабинет", path: "/profile/my_office" },
    { label: "Комментарии", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "/profile/logout" },
  ];

    // setPath(tabsMobile.map((el) => pathname === "/profile" ? el.path : ''))

  return (
    <div className={scss.LayoutProfile}>
        <div className={scss.content}>
          <div className={scss.headerDeckstop}
            style={{
              display: pathname === '/profile'
                ? ""
                : "",
            }}
          >
            <HeaderProfile />
          </div>
          <main className={scss.mainMobile}
          >
            {children}
          </main>
          <main className={scss.mainDeckstop}>
            {children}
          </main>
        </div>
    </div>
  );
};

export default LayoutProfile;
