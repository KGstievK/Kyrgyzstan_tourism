import { usePathname } from "next/navigation";
import { useGetRegionListQuery } from "@/redux/api/regions";
import PlaceInfo from "@/appPages/site/ui/placeInfo/PlaceInfo";
interface CommonData {
  name: string;
  image: string;
  description: string;
}
const Region = () => {
  const { data, isLoading, isError } = useGetRegionListQuery();
  const pathName = usePathname();
  const routeName = pathName.split("/")[1];

  const region = data?.find(
    (el) => el.region_category.toLocaleLowerCase() === routeName.toLowerCase()
  );

  if (!region) return null;

  const commonData: CommonData = {
    name: region.region_name,
    image: region.region_image,
    description: region.region_description,
  };

  return <PlaceInfo data={commonData} />;
};

export default Region;