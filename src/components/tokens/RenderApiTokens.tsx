import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { H2 } from "../ui/typography/Heading";
import { RefetchType } from "./CreateApiToken";
import TokenUi from "./TokenUi";
import useApiRequest from "@/hooks/request/useApiRequest";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";

export type ApiTokenType = {
  token: string;
  name: string;
  created_at: string;
};

type RenderApiTokensParams = {
  api_tokens: ApiTokenType[];
  refetch: RefetchType;
};

const RenderApiTokens = ({ api_tokens, refetch }: RenderApiTokensParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      // Call API to delete all api tokens
      const payload: any = {
        path: "/user/api_token/all",
        method: "DELETE",
        auth: true,
      };
      const result = await request(payload);

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: result.data.message,
          });

          // After creating the token, refetch the data
          refetch();
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="text-center mb-12 relative">
        <H2 className="uppercase">Api Tokens</H2>
        <Button
          className="absolute flex gap-2 items-center text-base right-0 top-1/2 -translate-y-1/2"
          type="button"
          variant={"destructive"}
          size={"sm"}
          onClick={handleDeleteAll}
          disabled={isLoading}
        >
          <Trash2 size={19} />
          <span>Delete All</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {api_tokens.map((api_token, index) => (
          <TokenUi key={index} api_token={api_token} refetch={refetch} />
        ))}
      </div>
    </>
  );
};
export default RenderApiTokens;
