import { Button } from "@/components/ui/button";
import { H1, H2, InlineCode } from "@/components/ui/typography/Heading";
import { FallbackProps } from "react-error-boundary";

const ErrorBoundaryRenderer = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-full">
      <H2 className="uppercase">{error.message}</H2>
      <H1 className="flex flex-col gap-2 items-center text-center text-destructive">
        <InlineCode className="mb-4 text-xl">{location.href}</InlineCode>
        <span className="text-9xl">{500}</span>
      </H1>
      {/* <P className="mb-4">{error.message}</P> */}
      <Button
        variant={"secondary"}
        size={"lg"}
        type="button"
        onClick={resetErrorBoundary}
      >
        Try again
      </Button>
    </div>
  );
};
export default ErrorBoundaryRenderer;
