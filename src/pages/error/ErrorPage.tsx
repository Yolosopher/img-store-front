import { Button } from "@/components/ui/button";
import { H1, H2, InlineCode, P } from "@/components/ui/typography/Heading";
import { Link } from "react-router-dom";

const ErrorPage = ({
  title,
  code,
  description,
}: {
  title: string;
  description: string;
  code: string | number;
}) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 h-full">
      <H2 className="uppercase">{title}</H2>
      <H1 className="flex flex-col gap-2 items-center text-center text-destructive">
        <InlineCode className="mb-4 text-xl">{location.href}</InlineCode>
        <span className="text-9xl">{code}</span>
      </H1>
      <P className="mb-4">{description}</P>
      <Button variant={"secondary"} size={"lg"} asChild>
        <Link to="/">Go back to home page</Link>
      </Button>
    </div>
  );
};
export default ErrorPage;
