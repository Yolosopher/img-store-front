import { cn } from "@/lib/utils";

export interface TypoGraphyHeadingParams
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function H1({ children, className, ...args }: TypoGraphyHeadingParams) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...args}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...args }: TypoGraphyHeadingParams) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...args}
    >
      {children}
    </h2>
  );
}
export function H3({ children, className, ...args }: TypoGraphyHeadingParams) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...args}
    >
      {children}
    </h3>
  );
}
export function H4({ children, className, ...args }: TypoGraphyHeadingParams) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...args}
    >
      {children}
    </h3>
  );
}
export interface TypoGraphyParagraphParams
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
export function P({ children, className, ...args }: TypoGraphyParagraphParams) {
  return (
    <p className={cn("leading-7", className)} {...args}>
      {children}
    </p>
  );
}
export interface TypoGraphyCodeParams
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function InlineCode({
  children,
  className,
  ...args
}: TypoGraphyCodeParams) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...args}
    >
      {children}
    </code>
  );
}
