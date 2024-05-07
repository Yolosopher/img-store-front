import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { Images, Loader } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  pageTitle: string;
  buttonText: string;
  children: React.ReactNode;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthLayout = ({
  pageTitle,
  buttonText,
  submitHandler,
  className,
  children,
  isLoading,
  setIsLoading,
  ...props
}: UserAuthFormProps) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await submitHandler(e);
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="container relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
        style={{ height: "calc(100dvh - 7rem)" }}
      >
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-background" />
          <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
            <Images />
            <span>IMG Store</span>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {pageTitle}
              </h1>
            </div>

            <div className={cn("grid gap-6", className)} {...props}>
              <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                  {children}
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {buttonText}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
