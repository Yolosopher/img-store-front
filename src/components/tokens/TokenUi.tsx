import { Trash } from "lucide-react";
import CopyClipboard from "../shared/clipboard/CopyClipboard";
import { Button } from "../ui/button";
import { H4, P } from "../ui/typography/Heading";
import { ApiTokenType } from "./RenderApiTokens";
import moment from "moment";
import { useState } from "react";
import useApiRequest from "@/hooks/request/useApiRequest";
import { toast } from "../ui/use-toast";
import { RefetchType } from "./CreateApiToken";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";

const TokenUi = ({
  refetch,
  api_token: { created_at, name, token },
}: {
  refetch: RefetchType;
  api_token: ApiTokenType;
}) => {
  const errorHandler = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = useApiRequest();
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Call API to delete the token
      const payload: any = {
        path: `/user/api_token/${token}`,
        method: "DELETE",
        auth: true,
      };
      if (name) {
        payload.body = {
          name,
        };
      }
      const result = await request(payload);

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: `Token ${name} deleted successfully`,
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
    <div className="flex flex-col gap-2 bg-secondary rounded-md p-4 w-full max-w-md relative select-none">
      <Button
        type="button"
        onClick={handleDelete}
        variant={"destructive"}
        size={"icon"}
        disabled={isLoading}
        className="absolute top-4 right-4"
      >
        <Trash />
      </Button>
      <div className="flex flex-col gap-2">
        <H4 className="">Name: {name}</H4>
        <P className="!mt-0">Created: {moment(created_at).fromNow()}</P>
      </div>
      <CopyClipboard
        title={token}
        as="div"
        message="Token copied to clipboard"
        contentToCopy={token}
        withoutTooltip
        className="p-2 rounded-md bg-card"
      >
        <div className="">
          <span className="text-primary">
            {token.slice(0, 12) + " ... " + token.slice(-12)}
          </span>
        </div>
      </CopyClipboard>
    </div>
  );
};
export default TokenUi;
