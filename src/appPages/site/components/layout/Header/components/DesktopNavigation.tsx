import Link from "next/link";
import scss from "../Header.module.scss";
// Types
interface NavItem {
  name: {
    ru: string;
    ar: string;
    en: string;
  };
  path: string;
}

export const DesktopNavigation = ({
  navItems,
  regions,
  isActive,
  isRegion,
  setIsRegion,
  isRegionName,
  setIsRegionName,
  t,
}: {
  navItems: NavItem[];
  regions: { name: string[]; path: string }[];
  isActive: (path: string) => boolean;
  isRegion: boolean;
  setIsRegion: (value: boolean) => void;
  isRegionName: string;
  setIsRegionName: (value: string) => void;
  t: (ru: string, ar: string, en: string) => string;
}) => (
  <nav>
    <ul className={scss.nav}>
      {navItems.map((item) => (
        <li key={item.path}>
          {item.path ? (
            <Link
              href={item.path}
              className={
                isActive(item.path) ? `${scss.active} ${scss.link}` : scss.link
              }
            >
              {t(item.name.ru, item.name.ar, item.name.en)}
            </Link>
          ) : (
            <div
              className={isRegion ? `${scss.active} ${scss.link}` : scss.link}
              onClick={() => setIsRegion(!isRegion)}
            >
              {t(item.name.ru, item.name.ar, item.name.en)}
              {isRegion && (
                <ul className={scss.regions}>
                  {regions.map((region) => (
                    <li
                      key={region.path}
                      onMouseEnter={() => setIsRegionName(region.name[0])}
                      onMouseLeave={() => setIsRegionName("")}
                    >
                      <Link href={region.path}>
                        {t(region.name[0], region.name[1], region.name[2])}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
