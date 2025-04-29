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
  const rawData = Object.fromEntries(formData.entries());

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