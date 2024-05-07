/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

import { Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type CopyClipboardProps = {
  contentToCopy: string;
  children: React.ReactNode;
  as: keyof JSX.IntrinsicElements;
  className?: string;
  title?: string;
  message?: string;
  withoutTooltip?: boolean;
};
const CopyClipboard = ({
  as,
  children,
  contentToCopy,
  className,
  title,
  message,
  withoutTooltip,
}: CopyClipboardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const As = as;

  const copyContent = () => {
    navigator?.clipboard.writeText(contentToCopy);
    toast({
      // @ts-ignore
      title: (
        <div className="flex gap-2 items-center">
          <Copy />
          <span>Copied</span>
        </div>
      ),
      description: message || `Copied text: ${contentToCopy}`,
    });
  };
  return withoutTooltip ? (
    <As
      onClick={copyContent}
      {...(title && { title: title })}
      className={cn("select-all cursor-pointer", className || "")}
    >
      {children}
    </As>
  ) : (
    <TooltipProvider delayDuration={300}>
      <Tooltip
        open={open}
        onOpenChange={() => {
          setOpen((prevstate) => !prevstate);
        }}
      >
        <TooltipTrigger asChild>
          <As
            onClick={copyContent}
            {...(title && { title: title })}
            className={cn("select-all cursor-pointer", className || "")}
          >
            {children}
          </As>
        </TooltipTrigger>
        <TooltipContent side="top" align="start" className="relative">
          Click to copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default CopyClipboard;
