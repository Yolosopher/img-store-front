import { ReadAccess } from "@/types";
import PrivateImage from "./PrivateImage";
import CONFIG from "@/config";

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  name: string;
  access: ReadAccess;
}

const Image = ({ name, access, ...args }: ImageProps) => {
  return access === ReadAccess.PUBLIC ? (
    <img src={`${CONFIG.backend_url}/image/${name}`} alt={name} {...args} />
  ) : (
    <PrivateImage name={name} {...args} />
  );
};
export default Image;
