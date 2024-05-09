import { v4 as uuid } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export const randomUID = () => uuid();

export const getFileExtension = (filename: string) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const clearFileInput = (fileInput: HTMLInputElement) => {
  try {
    fileInput.value = "";
    if (fileInput.value) {
      fileInput.type = "text";
      fileInput.type = "file";
    }
  } catch (e) {
    console.error(e);
    // ignore
  }
};

export const getParsedError = (resBody: any): string => {
  if (typeof resBody === "string") {
    return resBody;
  }
  if (resBody.message) {
    return resBody.message;
  }

  const { errors } = resBody;

  return errors.map(({ message }: { message: string }) => message).join("\n");
};
