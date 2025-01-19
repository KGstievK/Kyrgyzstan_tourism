import scss from "../Header.module.scss"

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
  }) => (
    <div>
      <select
        onChange={(e) => changeLanguage(e.target.value)}
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
      {/* <img
        style={{
          transform: `rotate(${isRotate ? 180 : 0}deg)`,
          transition: "transform 0.1s ease-in-out",
        }}
        // src={down.src}
        alt="arrow down"
      /> */}
    </div>
  );