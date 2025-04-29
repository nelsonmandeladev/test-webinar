import { i18nConfig } from "@/locales";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Reusable validation function
export function validateFormData<T extends z.ZodType>(
  formData: FormData,
  schema: T
): z.infer<T> {
  // Handle arrays properly by grouping values with the same key
  const rawData: Record<string, string | string[]> = {};

  for (const [key, value] of formData.entries()) {
    // If the key already exists and is an array, add to it
    if (key in rawData) {
      if (Array.isArray(rawData[key])) {
        (rawData[key] as string[]).push(value as string);
      } else {
        // Convert existing value to an array with the new value
        rawData[key] = [rawData[key] as string, value as string];
      }
    } else {
      // First occurrence of this key
      rawData[key] = value as string;
    }
  }

  const validationResult = schema.safeParse(rawData);

  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) => `${field}: ${errors?.join(", ")}`)
      .join("; ");

    throw new Error(errorMessage);
  }
  return validationResult.data;
}

export function buildPathNAme(locale: string, path: string) {
  if (locale === i18nConfig.defaultLocale) {
    return path;
  }

  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}