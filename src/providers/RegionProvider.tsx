import { useGetRegionListQuery } from "@/redux/api/regions";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface RegionProviderProps {
    children: ReactNode
}

export const RegionProvider: FC<RegionProviderProps> = ({children}) => {
    const { data } = useGetRegionListQuery();
    console.log(data);
    
    const pathName = usePathname();
    const router = useRouter();
    const handelNavigate = () => {
      switch (pathName) {
        case "/talas":
        case "/chui":
        case "/issyk-kyl":
        case "/jalal-abad":
        case "/naryn":
        case "/osh":
        case "/batken":
          if (!data) {
            router.push("/404");
          }
          break;
        case "/404":
          if (data) {
              router.push('/talas')
        }

      }
    };

    useEffect(() => {
        handelNavigate()
    }, [data, pathName, router])

    return children
};

