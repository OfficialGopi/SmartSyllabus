import clsx from "clsx";
import { twMerge, type ClassNameValue } from "tailwind-merge";

export const cn = (...classes: ClassNameValue[]): string => {
  return twMerge(clsx(classes));
};
