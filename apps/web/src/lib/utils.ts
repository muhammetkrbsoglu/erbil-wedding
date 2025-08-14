import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBadgeVariantByStatus(status: string) {
  switch (status) {
    case "pending":
      return "default";
    case "confirmed":
      return "success";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}
