import MarkdownPreview from "@uiw/react-markdown-preview";
import { useEffect, useState } from "react";

const MarkdownView = ({ src }: { src: string }) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const getMarkdown = async () => {
      const response = await fetch(src);
      const data = await response.text();
      setContent(data);
    };
    getMarkdown();
  }, [src]);
  return (
    <MarkdownPreview
      rehypeRewrite={(node: any, _: number, parent: any) => {
        if (
          node.tagName === "a" &&
          parent &&
          /^h(1|2|3|4|5|6)/.test(parent.tagName)
        ) {
          parent.children = parent.children.slice(1);
        }
      }}
      source={content}
      style={{ padding: 16 }}
      className="rounded-md"
    />
  );
};
export default MarkdownView;
