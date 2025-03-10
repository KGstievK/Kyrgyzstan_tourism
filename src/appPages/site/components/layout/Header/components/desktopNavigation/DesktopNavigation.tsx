import Link from "next/link";
import scss from "../../Header.module.scss";
import { usePathname } from "next/navigation";

interface NavItem {
  name: {
    ru: string;
    ar: string;
    en: string;
  };
  path: string;
}

interface Region {
  name: string[];
  path: string;
}

// Пропсы для навигации десктопа
interface DesktopNavigationProps {
  navItems: NavItem[];
  regions: Region[];
  isActive: (path: string) => boolean;
  isRegionOpen: boolean;
  setIsRegionOpen: (value: boolean) => void;
  t: (ru: string, ar: string, en: string) => string;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navItems,
  regions,
  isActive,
  isRegionOpen,
  setIsRegionOpen,
  t,
}) => {
  const pathname = usePathname();

  // Проверка, находится ли пользователь на странице одного из регионов
  const isRegionActive = regions.some((region) => pathname.startsWith(region.path));

  return (
    <nav className={scss.desktopNav}>
      <ul className={scss.navList}>
        {navItems.map((item) => (
          <li key={item.path} className={scss.navItem}>
            {item.path ? (
              <Link
                href={item.path}
                className={`${scss.navLink} ${isActive(item.path) ? scss.active : ""}`}
              >
                {t(item.name.ru, item.name.ar, item.name.en)}
              </Link>
            ) : (
              <div
                className={`${scss.navLink} ${isRegionOpen || isRegionActive ? scss.active : ""}`}
                onClick={() => setIsRegionOpen(!isRegionOpen)}
              >
                {t(item.name.ru, item.name.ar, item.name.en)}
                {isRegionOpen && (
                  <div className={scss.regionDropdownWrapper}>
                    <ul className={scss.regionList}>
                      {regions.map((region) => (
                        <li
                          key={region.path}
                          className={scss.regionItem}
                        >
                          <Link href={region.path}>
                            {t(region.name[0], region.name[1], region.name[2])}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};