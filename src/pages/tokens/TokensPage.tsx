import CreateApiToken from "@/components/tokens/CreateApiToken";
import RenderApiTokens from "@/components/tokens/RenderApiTokens";
import useApiRequest from "@/hooks/request/useApiRequest";
import { getParsedError } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useQuery } from "react-query";

const TokensPage = () => {
  const request = useApiRequest();
  const { data, isLoading, error, refetch } = useQuery(
    "api_tokens",
    async () => {
      const result = await request({
        path: "/auth/self",
        method: "GET",
        auth: true,
      });
      if (result) {
        if (!result.success) {
          const parsedError = getParsedError(result.error);
          throw new Error(parsedError);
        } else {
          return result.data.user.api_tokens;
        }
      }
    }
  );

  return isLoading ? (
    <Loader className="mr-2 h-4 w-4 animate-spin" />
  ) : error ? (
    <>{error}</>
  ) : (
    <div className="container py-12">
      <CreateApiToken refetch={refetch} />
      <RenderApiTokens api_tokens={data} refetch={refetch} />
    </div>
  );
};
export default TokensPage;
