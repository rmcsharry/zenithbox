import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function appendToLocalStorage(key: string, newData: string) {
  let item = localStorage.getItem(key);
  item += newData;
  localStorage.setItem(key, item || "");
}