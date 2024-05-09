import RenderUsers from "@/components/admin/RenderUsers";
import { H2 } from "@/components/ui/typography/Heading";
import useApiRequest from "@/hooks/request/useApiRequest";
import { getParsedError } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "react-query";

const UsersPage = () => {
  const request = useApiRequest();

  const { data, isLoading, error } = useQuery("Users", async () => {
    const result = await request({
      path: "/admin",
      method: "GET",
      auth: true,
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

  return isLoading ? (
    <Loader className="mr-2 h-4 w-4 animate-spin" />
  ) : error ? (
    <>{error}</>
  ) : (
    <div className="container py-12">
      <H2 className="uppercase text-center mb-4">Users</H2>
      <RenderUsers data={data} />
    </div>
  );
};
export default UsersPage;
