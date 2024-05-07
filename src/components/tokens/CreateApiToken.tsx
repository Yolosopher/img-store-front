import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { toast } from "../ui/use-toast";
import { H2 } from "../ui/typography/Heading";
import useApiRequest from "@/hooks/request/useApiRequest";
import AuthInput from "../auth/AuthInput";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";

export type RefetchType = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => Promise<QueryObserverResult<any, unknown>>;

const CreateApiToken = ({ refetch }: { refetch: RefetchType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = useApiRequest();

  const createApiToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const nameInput = form.token_name;
      const name = nameInput.value;
      // Call API to create a new token

      const payload: any = {
        path: "/user/api_token/create",
        method: "POST",
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
          throw new Error(result.error?.message || result.error);
        } else {
          toast({
            title: "Success",
            description: `Token ${name} created successfully`,
          });

          nameInput.value = "";
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-8">
      <H2 className="uppercase text-center mb-4">create new api token</H2>

      <form className="grid gap-4 max-w-xs mx-auto" onSubmit={createApiToken}>
        <AuthInput
          labelText="Token Name"
          name="token_name"
          placeholder="Type a name for api token"
        />
        <Button disabled={isLoading}>
          {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </form>
    </div>
  );
};
export default CreateApiToken;
