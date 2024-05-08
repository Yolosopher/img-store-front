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
      <H3 className="text-center mb-3 uppercase text-primary">
        {access_type === "public" ? "Public Images" : "Private Images"}
      </H3>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {images.map((image) => (
          <ImageItem key={image._id} image={image} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};
export default ShowImages;
