import PlaceInfo from "@/appPages/site/ui/placeInfo/PlaceInfo";

interface CommonData {
  name: string;
  image: string;
  description: string;
}

interface RegionProps {
  region: REGION_LIST.RegionResponse;
}

const Region: React.FC<RegionProps> = ({ region }) => {
  const commonData: CommonData = {
    name: region.region_name,
    image: region.region_image,
    description: region.region_description,
  };

  return <PlaceInfo data={commonData} />;
};

export default Region;