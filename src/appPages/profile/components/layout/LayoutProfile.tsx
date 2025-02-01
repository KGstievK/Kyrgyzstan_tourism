import { usePathname } from "next/navigation";
import scss from "./LayoutProfile.module.scss";
import { FC, ReactNode, useState } from "react";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile/HeaderProfile";

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
    { label: "Личный Кабинет", path: "/profile" },
    { label: "Мои покупки", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "/profile/logout" },
  ];
  const tabsMobile = [
    { label: "Профиль", path: "/profile" },
    { label: "Личный Кабинет", path: "/profile/my-office" },
    { label: "Мои покупки", path: "/profile/history" },
    { label: "Избранные", path: "/profile/favorite" },
    { label: "Выйти", path: "/profile/logout" },
  ];

    // setPath(tabsMobile.map((el) => pathname === "/profile" ? el.path : ''))

  return (
    <div className={scss.LayoutProfile}>
      <div className="container">
        <p className={scss.deckstop}>
          <Link href="/">Главная</Link>
          <span>/</span>Профиль <span>/</span>
          {tabs.map((iten) => (pathname === iten.path ? iten.label : ""))}
        </p>
        <p className={scss.mobile} >
          <Link href="/">Главная</Link>
          <span>/</span><Link href="/profile">Профиль</Link><span>/</span>{tabsMobile.map((iten) => (pathname === "/profile" ? '' : pathname === iten.path ? iten.label : null))}
        </p>
        <div className={scss.content}>
          <div className={scss.headerMobile}
            style={{
              display: pathname === '/profile'
                ? ""
                : "none",
            }}
          >
            <HeaderProfile />
          </div>
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
            style={{
              display: pathname === '/profile'
                ? "none"
                : "",
            }}
          >
            {children}
          </main>
          <main className={scss.mainDeckstop}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutProfile;
