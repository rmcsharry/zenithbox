import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function appendToLocalStorage(key: string, newData: string) {
  let item = localStorage.getItem(key);

  // TODO: Handle the case where the item is not found
  if (item) {
    item += newData;
    localStorage.setItem(key, item);
  };
}