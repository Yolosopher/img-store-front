import { cn } from "@/lib/utils";

export interface TypoGraphyOListParams
  extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

export const OList = ({
  children,
  className,
  ...args
}: TypoGraphyOListParams) => {
  return (
    <ol className={cn("my-1 ml-6 list-disc [&>li]:mt-2", className)} {...args}>
      {children}
    </ol>
  );
};

export interface TypoGraphyUListParams
  extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}
export const UList = ({
  children,
  className,
  ...args
}: TypoGraphyUListParams) => {
  return (
    <ul className={cn("my-1 ml-6 list-disc [&>li]:mt-2", className)} {...args}>
      {children}
    </ul>
  );
};
