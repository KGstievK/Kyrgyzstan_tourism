// components/LanguageSelector.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import scss from "../Header.module.scss";
import downArrow from "@/assets/images/headerImages/Vector.png";
import { ChevronDown } from "lucide-react";

// Пропсы для выбора языка
interface LanguageSelectorProps {
  lang: string;
  isRotate: boolean;
  setIsRotate: (value: boolean) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  lang,
  isRotate,
  setIsRotate,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние открытия/закрытия выпадающего списка
  const languages = ["ru", "ar", "en"]; // Доступные языки

  const handleLanguageChange = (value: string) => {
    localStorage.setItem("lang", value);
    window.location.reload();
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== lang) {
      handleLanguageChange(storedLang);
    }
  }, [lang]);

  return (
    <div className={scss.languageSelector}>
      <div
        style={
          isOpen
            ? { background: "#FFFFFF99", backdropFilter: "blur(4px)", borderBottom: 0 }
            : { background: "transparent" }
        }
        className={`${scss.langSelect} ${isOpen ? scss.open : ""}`} // Добавляем класс при открытии
        onClick={() => {
          setIsOpen(!isOpen);
          setIsRotate(!isRotate);
        }}
      >
        <span>{lang.toUpperCase()}</span>
        <ChevronDown
          size={14}
          style={{
            transform: `rotate(${isRotate ? 180 : 0}deg)`,
            transition: "transform 0.1s ease-in-out",
            marginLeft: "5px", // Отступ между текстом и стрелкой
          }}
        />
      </div>

      {isOpen && (
        <div className={scss.languageDropdown}>
          {languages.map((value) => (
            <div
              key={value}
              className={scss.languageOption}
              onClick={() => {
                handleLanguageChange(value);
                setIsOpen(false);
                setIsRotate(false);
              }}
            >
              <span>{value.toUpperCase()}</span> {/* Текст внутри span */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};