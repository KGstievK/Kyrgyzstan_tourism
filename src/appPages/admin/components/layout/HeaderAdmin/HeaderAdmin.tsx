import { usePathname } from "next/navigation";
import scss from "./HeaderAdmin.module.scss";
import Link from "next/link";

const HeaderAdmin = () => {
  const pathname = usePathname();
  console.log(pathname);
  
  const tabs = [
    { label: "Статистика", path: "/admin" },
    { label: "Редактор продуктов", path: "/admin/addproduct" },
    { label: "Редактор категорий", path: "/admin/addcategory" },
    { label: "Редактор слайдеров", path: "/admin/addslider" },
    { label: "Контроль заказов", path: "/admin/order" },
  ];
  return (
    <section className={scss.HeaderAdmin}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.nav}>
            <ul>
              {tabs.map((tab, idx) => (
                <li key={idx}>
                    <Link href={tab.path}>
                      <button className={pathname === tab.path ? scss.active : ''}>
                        {tab.label}
                      </button>
                    </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderAdmin;
