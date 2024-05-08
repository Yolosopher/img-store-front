import { useState } from "react";
import { toast } from "../ui/use-toast";
import useApiRequest from "@/hooks/request/useApiRequest";
import { H3 } from "../ui/typography/Heading";
import RadioInput from "./RadioInput";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import RenderPayloadImage from "./RenderPayloadImage";
import { clearFileInput, getFileExtension } from "@/lib/utils";
import CONFIG from "@/config";
import useErrorHandler from "@/hooks/error-handler/useErrorHandler";

type UploadImageParams = {
  refetch: () => void;
};

const UploadImage = ({ refetch }: UploadImageParams) => {
  const request = useApiRequest();
  const errorHandler = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    try {
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
          clearFileInput(form.image);
          setUploadFile(null);
          errorHandler(result.error);
        } else {
          toast({
            title: "Success",
            description: "Image uploaded successfully",
          });

          // clean form
          clearFileInput(form.image);
          setUploadFile(null);

          // After creating the token, refetch the data
          refetch();
        }
      } else {
        clearFileInput(form.image);
        setUploadFile(null);
      }
    } catch (error: any) {
      clearFileInput(form.image);
      errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearFileInput(e.target);
      return e.preventDefault();
    }
    const ext = getFileExtension(file!.name); // without the dot

    if (!CONFIG.allowed_image_extensions.includes(ext)) {
      toast({
        title: "Error",
        description: `Invalid file type. Allowed types are ${CONFIG.allowed_image_extensions.join(
          ", "
        )}`,
        variant: "destructive",
      });
      clearFileInput(e.target);
      return e.preventDefault();
    }
    setUploadFile(file);
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
            pattern=".*\.(gif|jpe?g|png|webp)$"
            accept="image/*"
            onChange={onFileInputChange}
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
