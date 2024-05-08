import { useEffect, useState } from "react";
import { P } from "../ui/typography/Heading";

const RenderPayloadImage = ({ file }: { file: File | null }) => {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const renderImage = () => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file as Blob);
    };
    if (file) {
      renderImage();
    }
  }, [file]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {dataUrl ? (
        <img
          src={dataUrl}
          alt="image_payload"
          className="w-full h-full object-cover"
        />
      ) : (
        <P className="text-center capitalize">Nothing in Payload...</P>
      )}
    </div>
  );
};
export default RenderPayloadImage;
