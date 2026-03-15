"use client";

import Link from "next/link";

import {
  BriefcaseBusiness,
  Building,
  Building2,
  MapPin,
  Timer,
  Wallet,
} from "lucide-react";
import { FaStar } from "react-icons/fa6";

import {
  Currency,
  JobMode,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/browser";
import { JobListItem } from "@/types/api";

import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

export function JobCard({ job }: { job: JobListItem }) {
  const {
    id,
    companyLogo,
    companyName,
    role,
    isFeatured,
    isBookmarked,
    jobStatus,
    jobMode,
    jobType,
    salary,
    salaryPeriod,
    currency,
    experienceMin,
    experienceMax,
    appliedOn,
    applicationStatus,
    location,
    openings,
    createdAt,
  } = job;

  function getSalaryPeriod(period: SalaryPeriod): string {
    switch (period) {
      case SalaryPeriod.MONTHLY:
        return "month";
      default:
        return "year";
    }
  }

  function formatMoney(
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
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // Format the amount and return it
    return formatter.format(amount);
  }

  function formatEnums(value: JobType | JobMode): string {
    return value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="relative">
      <Link href={`/job-seeker/jobs/${id}`}>
        <Card className={`h-full hover:border-brand/60 transition-all`}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 md:gap-0">
              <div>
                <CardTitle className="text-lg font-bold">{role}</CardTitle>
                <CardDescription className="font-bold mt-2 flex items-center gap-2">
                  <Building2 size={20} /> {companyName}
                </CardDescription>
              </div>

              {isFeatured && (
                <Badge className="bg-brand/10 text-brand border border-brand/20">
                  <FaStar /> Featured
                </Badge>
              )}
            </div>
          </CardHeader>

          <Separator />

          <CardContent>
            <div className="max-w-xl grid grid-cols-2 gap-5 text-gray-600 dark:text-muted-foreground">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness size={16} />
                <span className="text-sm">
                  {experienceMin}-{experienceMax} years
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={16} />
                <span className="text-sm flex items-center">
                  {formatMoney(salary, currency)} /{" "}
                  {getSalaryPeriod(salaryPeriod)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={16} />
                <span className="text-sm">{formatEnums(jobType)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building size={16} />
                <span className="text-sm">{formatEnums(jobMode)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">{location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Link>
    </div>
  );
}
