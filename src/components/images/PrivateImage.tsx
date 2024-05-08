import useErrorHandler from "@/hooks/error-handler/useErrorHandler";
import useApiRequest from "@/hooks/request/useApiRequest";
import { useEffect, useState } from "react";

interface PrivateImageProps extends React.HTMLProps<HTMLImageElement> {
  name: string;
}

const PrivateImage = ({ name, ...args }: PrivateImageProps) => {
  const errorHandler = useErrorHandler();
  const request = useApiRequest();
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const imageUrlGenerator = async () => {
      try {
        const result = await request({
          path: `/image/${name}`,
          method: "GET",
          apiAuth: true,
        });
        if (result) {
          if (!result.success) {
            errorHandler(result.error);
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              setDataUrl(reader.result as string);
            };
            reader.readAsDataURL(result.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    imageUrlGenerator();
  }, [name]);
  return dataUrl ? <img src={dataUrl} alt={name} {...args} /> : null;
};
export default PrivateImage;
