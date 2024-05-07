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
