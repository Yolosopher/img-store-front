import { H2, H3 } from "@/components/ui/typography/Heading";
import { Link } from "react-router-dom";
import MarkdownView from "@/components/shared/markdown/MarkdownView";

const DocsPage = () => {
  return (
    <div className="container py-12">
      <H2 className="uppercase text-center mb-4">
        Instructions to consume API
      </H2>
      <div className="p-4">
        <H3 className="mb-4 text-primary uppercase">
          <Link to="#upload-image">upload image</Link>
        </H3>
        <MarkdownView src="/docs/upload-image.md" />
      </div>
      <div className="p-4">
        <H3 className="mb-4 text-primary uppercase">
          <Link to="#delete-image">delete image</Link>
        </H3>
        <MarkdownView src="/docs/delete-image.md" />
      </div>
      <div className="p-4">
        <H3 className="mb-4 text-primary uppercase">
          <Link to="#get-all-images">get all images</Link>
        </H3>
        <MarkdownView src="/docs/get-all-images.md" />
      </div>
      <div className="p-4">
        <H3 className="mb-4 text-primary uppercase">
          <Link to="#get-image">get image</Link>
        </H3>
        <MarkdownView src="/docs/get-image.md" />
      </div>
      <div className="p-4">
        <H3 className="mb-4 text-primary uppercase">
          <Link to="#get-image">change image access</Link>
        </H3>
        <MarkdownView src="/docs/change-image-access.md" />
      </div>
    </div>
  );
};
export default DocsPage;
