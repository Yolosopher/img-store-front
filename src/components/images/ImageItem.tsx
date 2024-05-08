import moment from "moment";
import CopyClipboard from "../shared/clipboard/CopyClipboard";
import Image from "./Image";
import { ImageType } from "./ShowImages";
import { toast } from "../ui/use-toast";
import useApiRequest from "@/hooks/request/useApiRequest";
import { Button } from "../ui/button";
import { Eye, EyeOff, Trash } from "lucide-react";

const ImageItem = ({
  image,
  refetch,
}: {
  image: ImageType;
  refetch: () => void;
}) => {
  const request = useApiRequest();
  const deleteImage = async () => {
    try {
      const payload: any = {
        path: `/image/${image.name}`,
        method: "DELETE",
        apiAuth: true,
      };
      const result = await request(payload);
      if (result) {
        if (!result.success) {
          throw new Error(result.error?.message || result.error);
        } else {
          toast({
            title: "Success",
            description: "Image deleted successfully",
          });

          // After creating the token, refetch the data
          refetch();
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  const changeAccess = async () => {
    try {
      const payload: any = {
        path: `/image/${image.name}`,
        method: "PATCH",
        apiAuth: true,
        body: {
          access: image.read_access === "public" ? "private" : "public",
        },
      };
      const result = await request(payload);
      if (result) {
        if (!result.success) {
          throw new Error(result.error?.message || result.error);
        } else {
          toast({
            title: "Success",
            description: "Access changed successfully",
          });

          // After creating the token, refetch the data
          refetch();
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div
      key={image._id}
      className="flex flex-col gap-2 bg-secondary rounded-md p-4 w-full max-w-md relative select-none"
    >
      <div className="rounded-md overflow-hidden w-full flex flex-shrink-0 flex-grow-0">
        <Image
          className="object-cover object-bottom w-full aspect-square"
          access={image.read_access}
          name={image.name}
        />
      </div>
      <CopyClipboard
        message={`Copied ${image.name} to clipboard!`}
        withoutTooltip
        as="p"
        className="text-sm md:text-lg  text-right"
        title="Copy Image Name"
        contentToCopy={image.name}
      >
        {image.name}
      </CopyClipboard>

      <p className="text-xs md:text-sm text-gray-400 text-right w-full">
        {moment(image.created_at).fromNow()}
      </p>
      <Button
        type="button"
        variant={"destructive"}
        onClick={deleteImage}
        title="Delete Image"
        size={"icon"}
        className="absolute top-6 right-6"
      >
        <Trash />
      </Button>
      <Button
        size={"icon"}
        type="button"
        variant={"secondary"}
        onClick={changeAccess}
        className="absolute top-6 left-6"
        title={image.read_access === "public" ? "Make Private" : "Make Public"}
      >
        {image.read_access === "public" ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};
export default ImageItem;
