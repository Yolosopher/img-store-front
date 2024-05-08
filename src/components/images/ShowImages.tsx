import { ReadAccess } from "@/types";
import { H3 } from "../ui/typography/Heading";
import ImageItem from "./ImageItem";

export type ImageType = {
  _id: string;
  owner: string;
  name: string;
  read_access: ReadAccess;
  created_at: string;
};

type ShowImagesParams = {
  images: ImageType[];
  refetch: () => void;
  access_type: ReadAccess;
};

const ShowImages = ({ images, refetch, access_type }: ShowImagesParams) => {
  return (
    <div className="pt-8">
      <H3 className="sticky z-10 top-0 text-center py-3 bg-card uppercase text-primary text-md sm:text-xl md:text-2xl">
        {access_type === "public" ? "Public Images" : "Private Images"}
      </H3>
      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
        {images.map((image) => (
          <ImageItem key={image._id} image={image} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};
export default ShowImages;
