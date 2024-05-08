import { H2 } from "@/components/ui/typography/Heading";
import MarkDownItem from "@/components/shared/markdown/MarkDownItem";

const DocsPage = () => {
  return (
    <div className="container py-12">
      <H2 className="uppercase text-center mb-4">
        Instructions to consume API
      </H2>
      <MarkDownItem
        uniqueId="upload-image"
        src="/docs/upload-image.md"
        title="upload image"
      />
      <MarkDownItem
        uniqueId="delete-image"
        src="/docs/delete-image.md"
        title="delete image"
      />
      <MarkDownItem
        uniqueId="get-all-images"
        src="/docs/get-all-images.md"
        title="get all images"
      />
      <MarkDownItem
        uniqueId="get-image"
        src="/docs/get-image.md"
        title="get image"
      />
      <MarkDownItem
        uniqueId="change-image-access"
        src="/docs/change-image-access.md"
        title="change image access"
      />
    </div>
  );
};
export default DocsPage;
