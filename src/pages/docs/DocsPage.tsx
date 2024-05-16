import { H2, H3, InlineCode, P } from "@/components/ui/typography/Heading";
import MarkDownItem from "@/components/shared/markdown/MarkDownItem";
import CopyClipboard from "@/components/shared/clipboard/CopyClipboard";
import CONFIG from "@/config";
import { Copy } from "lucide-react";

const DocsPage = () => {
  return (
    <div className="container py-12">
      <H2 className="uppercase text-center mb-4">
        Instructions to consume API
      </H2>

      <div className="py-4">
        <H3 className="mb-4 text-primary uppercase pl-2">api origin</H3>
        <P className="mb-2 pl-2">Use this origin for the following requests:</P>
        <CopyClipboard
          as={"div"}
          className="flex items-center gap-2 cursor-pointer w-max"
          withoutTooltip
          title={CONFIG.backend_url}
          contentToCopy={CONFIG.backend_url}
        >
          <InlineCode className="px-2">{CONFIG.backend_url}</InlineCode>
          <Copy />
        </CopyClipboard>
      </div>
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
