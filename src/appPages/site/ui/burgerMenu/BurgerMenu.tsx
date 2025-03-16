"use client"
import { useState } from "react";
import scss from "./BurgerMenu.module.scss";
import Link from "next/link"; // Изменили импорт на Next.js Link
import { usePathname } from "next/navigation";

const BurgerMenu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const pathname = usePathname();
  const links = [
    {
      link: "/",
      name: "Главная",
    },
    {
      link: "/new",
      name: "Новинки",
    },
    {
      link: "/catalog",
      name: "Категории",
    },
    {
      link: "/about",
      name: "О нас",
    },
    {
      link: "/contacts",
      name: "Контакты",
    },
  ];

  return (
    <>
      <section className={scss.BurgeMenu}>
        <button
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
        >
          <div
            style={{
              transform: openMenu
                ? "rotate(45deg)"
                : "rotate(0deg) translateX(0)",
              top: openMenu ? "20px" : "",
            }}
          ></div>
          <div
            style={{
              transform: openMenu ? "scale(0%)" : "scale(100%)",
              top: openMenu ? "20px" : "",
            }}
          ></div>
          <div
            style={{
              transform: openMenu
                ? "rotate(-45deg)"
                : "rotate(0deg) translateX(0)",
              top: openMenu ? "20px" : "",
            }}
          ></div>
        </button>
        {openMenu && (
          <div className="container">
            <div className={scss.content}>
              <div className={scss.nav}>
                <ul>
                  {links.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.link}
                        className={pathname === item.link ? scss.active : ""}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default BurgerMenu;