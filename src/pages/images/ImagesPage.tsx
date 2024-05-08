import { H2 } from "@/components/ui/typography/Heading";
import useApiRequest from "@/hooks/request/useApiRequest";
import { useQuery } from "react-query";
import Images from "../../components/images/Images";
import { ReadAccess } from "@/types";
import UploadImage from "@/components/images/UploadImage";
import { getParsedError } from "@/lib/utils";

const ImagesPage = () => {
  const request = useApiRequest();
  const queryPrivate = useQuery("Private Images", async () => {
    // Call API to get private images
    const result = await request({
      path: "/image/all?access=private",
      method: "GET",
      apiAuth: true,
    });
    if (result) {
      if (!result.success) {
        const parsedError = getParsedError(result.error);
        throw new Error(parsedError);
      } else {
        return result.data;
      }
    }
  });
  const queryPublic = useQuery("Public Images", async () => {
    // Call API to get public images
    const result = await request({
      path: "/image/all?access=public",
      method: "GET",
      apiAuth: true,
    });
    if (result) {
      if (!result.success) {
        const parsedError = getParsedError(result.error);
        throw new Error(parsedError);
      } else {
        return result.data;
      }
    }
  });
  // query: { data, isLoading, error, refetch }

  const refetch = () => {
    queryPrivate.refetch();
    queryPublic.refetch();
  };
  return (
    <div className="container py-12">
      <H2 className="uppercase text-center mb-4">Images</H2>
      <UploadImage refetch={refetch} />
      <div className="grid grid-cols-2 gap-4">
        <Images
          query={queryPrivate}
          refetch={refetch}
          access_type={ReadAccess.PRIVATE}
        />
        <Images
          query={queryPublic}
          refetch={refetch}
          access_type={ReadAccess.PUBLIC}
        />
      </div>
    </div>
  );
};
export default ImagesPage;
