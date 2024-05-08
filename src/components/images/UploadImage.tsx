import { useState } from "react";
import { toast } from "../ui/use-toast";
import useApiRequest from "@/hooks/request/useApiRequest";
import { H3 } from "../ui/typography/Heading";
import RadioInput from "./RadioInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import RenderPayloadImage from "./RenderPayloadImage";

type UploadImageParams = {
  refetch: () => void;
};
const UploadImage = ({ refetch }: UploadImageParams) => {
  const request = useApiRequest();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const access_input = form.access;
      const access = access_input.value;

      if (!uploadFile) {
        throw new Error("Please select a file to upload");
      }

      const formData = new FormData();
      formData.append("access", access);
      formData.append("image", uploadFile);

      const payload: any = {
        path: "/image/upload",
        method: "POST",
        apiAuth: true,
        body: formData,
      };
      const result = await request(payload);

      if (result) {
        if (!result.success) {
          throw new Error(result.error?.message || result.error);
        } else {
          toast({
            title: "Success",
            description: "Image uploaded successfully",
          });

          // clean form
          setUploadFile(null);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start content-start">
      <div className="bg-secondary h-52 md:h-72 flex flex-col justify-center w-full p-4 text-center rounded-md mx-auto">
        <H3 className="text-center mb-3 capitalize">Upload Image</H3>
        <form
          onSubmit={uploadImage}
          className="flex flex-col gap-4 items-center"
        >
          <RadioInput
            name="access"
            disabled={isLoading}
            options={[
              { value: "public", label: "Public" },
              { value: "private", label: "Private" },
            ]}
          />
          <Input
            id="image"
            name="image"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setUploadFile(e.target.files[0]);
              }
            }}
            className="file:text-card-foreground text-card-foreground border-primary w-52 p-1.5 text-center"
            disabled={isLoading}
          />
          <Button className="w-40" type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
      <div className="bg-secondary h-52 md:h-72 w-full p-4 text-center rounded-md">
        <RenderPayloadImage file={uploadFile} />
      </div>
    </div>
  );
};
export default UploadImage;
