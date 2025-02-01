"use client"
import {useEffect} from "react";
import styles from "./CultureTabs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchCulture } from "@/redux/slices/cultureSlices/cultureSlice";
import { usePathname, useRouter } from "next/navigation";


const CultureTabs = () => {
    const pathName = usePathname()
    const routeName = pathName.split("/")[2];    

    console.log(routeName);
    
  const dispatch = useDispatch()
  const {culture,loading, error} = useSelector((state: RootState) => state.cultureSlice)
  useEffect(() => {
    dispatch(fetchCulture())
  },[dispatch])

  const cultureItem = culture.find((item) => item.culture_name.replaceAll(" ","").toLowerCase() === routeName.replaceAll(" ","").toLowerCase())

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles["muted-background"]}></div>
          <h1 className={styles["top-heading"]}>{cultureItem?.culture_name}</h1>
          <p className={styles["top-paragraph"]}>{cultureItem?.culture_description}</p>
        </div>
        <div className={styles.main}>
          <div className={styles.img}>{}</div>
          <div className={styles["main-text"]}>
            <h3 className={styles["main-heading"]}>{}</h3>
            <p className={styles["main-paragraph"]}>{}</p>
          </div>
        </div>
      </div>
    </section>

  );
};

export default CultureTabs;
