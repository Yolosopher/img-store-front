import { toast } from "@/components/ui/use-toast";

const useParseError = () => {
  const parseError = (resBody: any) => {
    const { errors } = resBody;

    errors.forEach(
      ({ field, message }: { field?: string; message: string }) => {
        const payload: any = {
          variant: "destructive",
          description: message,
        };
        if (field) {
          payload.title = `Error for ${field}`;
        }

        toast(payload);
      }
    );
  };

  return parseError;
};
export default useParseError;
