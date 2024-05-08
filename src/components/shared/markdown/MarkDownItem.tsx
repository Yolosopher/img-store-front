import { H3 } from "@/components/ui/typography/Heading";
import { HashLink } from "react-router-hash-link";
import MarkdownView from "./MarkdownView";

const MarkDownItem = ({
  title,
  uniqueId,
  src,
}: {
  title: string;
  uniqueId: string;
  src: string;
}) => {
  return (
    <div className="py-4">
      <H3 id={uniqueId} className="mb-4 text-primary uppercase">
        <HashLink smooth to={`/#${uniqueId}`}>
          {title}
        </HashLink>
      </H3>
      <MarkdownView src={src} />
    </div>
  );
};
export default MarkDownItem;
