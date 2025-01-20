import { useEffect } from "react";
import scss from "../Header.module.scss";

export const LanguageSelector = ({ 
    lang, 
    changeLanguage, 
    isRotate, 
    setIsRotate 
  }: {
    lang: string;
    changeLanguage: (value: string) => void;
    isRotate: boolean;
    setIsRotate: (value: boolean) => void;
  }) => {
    const handleLanguageChange = (value: string) => {
        localStorage.setItem("lang", value);

        changeLanguage(value);

        window.location.reload();
    };

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang && storedLang !== lang) {
            changeLanguage(storedLang);
        }
    }, [lang, changeLanguage]);

    return (
        <div>
          <select
            onChange={(e) => handleLanguageChange(e.target.value)}
            onClick={() => setIsRotate(!isRotate)}
            id={scss.Lang}
            value={lang}
          >
            {["ru", "ar", "en"].map((value) => (
              <option key={value} value={value} hidden={lang === value}>
                {value}
              </option>
            ))}
          </select>
        </div>
    );
};
