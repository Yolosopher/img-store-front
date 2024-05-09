import useApiRequest from "@/hooks/request/useApiRequest";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "../ui/use-toast";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import { queryClient } from "@/App";

const GivePermission = ({ user_id }: { user_id: string }) => {
  const request = useApiRequest();
  const errorHandler = useErrorHandler();

  const handleGivePermission = async (id: string) => {
    try {
      const result = await request({
        path: `/admin/grant-admin/${id}`,
        method: "GET",
        auth: true,
      });

      if (result) {
        if (!result.success) {
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: "User has been granted admin permission",
          });

          // After creating the token, refetch the data
          queryClient.refetchQueries("Users");
        }
      }
    } catch (error: any) {
      errorHandler(error.message);
    }
  };

  return (
    <DropdownMenuItem onClick={() => handleGivePermission(user_id)}>
      Make Admin
    </DropdownMenuItem>
  );
};

export default GivePermission;
