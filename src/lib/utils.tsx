import { type ClassValue, clsx } from "clsx";
import { format, formatDistanceToNowStrict } from "date-fns";
import { DollarSign, Euro, IndianRupeeIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { size } from "zod";

import {
  Currency,
  JobMode,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSalaryPeriod(period: SalaryPeriod): string {
  switch (period) {
    case SalaryPeriod.MONTHLY:
      return "month";
    default:
      return "year";
  }
}

export function getCurrencyIcon(currency: Currency): React.ReactNode {
  switch (currency) {
    case Currency.INR:
      return <IndianRupeeIcon size={16} />;
    case Currency.EUR:
      return <Euro size={16} />;
    default:
      return <DollarSign size={16} />;
  }
}

export function formatMoney(
  amount: number,
  currency: Currency = Currency.INR,
  locale?: string,
) {
  // Default locale for each currency
  const currencyLocales: Record<string, string> = {
    USD: "en-US",
    INR: "en-IN",
    EUR: "de-DE",
  };

  // If locale is not provided, use the default locale for that currency
  const selectedLocale = locale || currencyLocales[currency];

  // Create a number formatter for currency
  const formatter = new Intl.NumberFormat(selectedLocale, {
    style: "decimal",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format the amount and return it
  return formatter.format(amount);
}

export function formatEnums(value: JobType | JobMode): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}
