"use client";
import Link from "next/link";
import scss from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
// import down from "@/images/down.png";
import { usePathname } from "next/navigation";
import useTranslate from "@/appPages/site/hooks/translate/translate";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { LanguageSelector } from "./components/LanguageSelector";
import BurgerMenu from "@/appPages/site/ui/burgerMenu/BurgerMenu";
import { useGetMeQuery } from "@/redux/api/auth";
import { Avatar, Badge, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface NavItem {
  name: {
    ru: string;
    ar: string;
    en: string;
  };
  path: string;
}

// Constants
const REGIONS = [
  { name: ["Чуй", "شوي", "Chui"], path: "/chui" },
  { name: ["Ош", "أوش", "Osh"], path: "/osh" },
  { name: ["Джалал-Абад", "جلال أباد", "Jalal-Abad"], path: "/jalal-abad" },
  { name: ["Нарын", "نارين", "Naryn"], path: "/naryn" },
  { name: ["Талас", "تالاس", "Talas"], path: "/talas" },
  { name: ["Баткен", "باتكين", "Batken"], path: "/batken" },
  { name: ["Иссык-Куль", "إيسيك كول", "Issyk-Kul"], path: "/issyk-kul" },
];

const NAV_ITEMS: NavItem[] = [
  { name: { ru: "Главная", ar: "الرئيسية", en: "Home" }, path: "/" },
  { name: { ru: "Регионы", ar: "المناطق", en: "Regions" }, path: "" },
  { name: { ru: "Культура", ar: "الثقافة", en: "Culture" }, path: "/culture" },
  { name: { ru: "Галерея", ar: "معرض", en: "Gallery" }, path: "/gallery" },
  { name: { ru: "Маршруты", ar: "الطرق", en: "Routes" }, path: "/routes" },
];

// Components

const Header = () => {
  const { data: userData, status } = useGetMeQuery();

  const { width } = useWindowSize();
  const { t, changeLanguage } = useTranslate();
  const lang = useSelector<RootState, string>(
    (state) => state.translate.currentLang
  );
  const pathname = usePathname();

  const [isShow, setIsShow] = useState(false);
  const [isRegion, setIsRegion] = useState(false);
  const [isRegionName, setIsRegionName] = useState("");
  const [isRotate, setIsRotate] = useState(false);

  useEffect(() => {
    setIsShow(false);
    setIsRegion(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return path === "/" ? pathname === path : pathname.startsWith(path);
  };

  return (
    <header id={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>LOGO</div>

          {width > 834 ? (
            <>
              <DesktopNavigation
                navItems={NAV_ITEMS}
                regions={REGIONS}
                isActive={isActive}
                isRegion={isRegion}
                setIsRegion={setIsRegion}
                isRegionName={isRegionName}
                setIsRegionName={setIsRegionName}
                t={t}
              />
              <div className={scss.block}>
                <LanguageSelector
                  lang={lang}
                  changeLanguage={changeLanguage}
                  isRotate={isRotate}
                  setIsRotate={setIsRotate}
                />
                {status === "fulfilled" ? (
                  <>
                    <Link href="/profile">
                      <Space direction="vertical" size={10}>
                        <Space wrap size={10}>
                          <Badge count={1}>
                            <Avatar size={47} icon={<UserOutlined />} />
                          </Badge>
                        </Space>
                      </Space>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/sign-up">
                      <button>{t("Войти", "التسجيل", "Sign in")}</button>
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={scss.block2}>
                <Link href="/auth/sign-up">
                  <button>{t("Войти", "التسجيل", "Sign in")}</button>
                </Link>
                <div className={scss.burger}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <BurgerMenu />
                {/* <img
                onClick={() => setIsShow(!isShow)}
                src="images/Vector.png"
                alt="menu-burger"
              /> */}
              </div>
              {isShow && (
                <div className={scss.modal}>
                  <nav>
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={isActive(item.path) ? scss.active : ""}
                      >
                        {t(item.name.ru, item.name.ar, item.name.en)}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
