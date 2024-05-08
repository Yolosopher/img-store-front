import { toast } from "@/components/ui/use-toast";
import useParseError from "../parse-error/useParseError";

const useErrorHandler = () => {
  const parseError = useParseError();

  const errorHandler = (error: string | any) => {
    if (typeof error === "string") {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      parseError(error);
    }
  };

  return errorHandler;
};

export default useErrorHandler;
