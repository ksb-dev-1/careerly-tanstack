"use client";

import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building,
  Building2,
  DollarSign,
  Euro,
  IndianRupeeIcon,
  MapPin,
  MoveRight,
  Timer,
  Wallet,
} from "lucide-react";
import { FaStar } from "react-icons/fa6";
import TurndownService from "turndown";

import {
  Currency,
  JobMode,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/browser";
import { JobListItem } from "@/types/api";

import { CustomLink } from "./custom-link";
import { Markdown } from "./markdown";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
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
    description,
    openings,
    createdAt,
  } = job;

  const turndown = new TurndownService();
  const markdown = turndown.turndown(description);
  const shortDescription = markdown.split("\n\n")[0];

  function getSalaryPeriod(period: SalaryPeriod): string {
    switch (period) {
      case SalaryPeriod.MONTHLY:
        return "month";
      default:
        return "year";
    }
  }

  function getCurrencyIcon(currency: Currency): React.ReactNode {
    switch (currency) {
      case Currency.INR:
        return <IndianRupeeIcon size={16} />;
      case Currency.EUR:
        return <Euro size={16} />;
      default:
        return <DollarSign size={16} />;
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
      style: "decimal",
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
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 bg-brand/10 text-brand border border-brand/20 rounded-lg flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <div className="w-fit">
              <CardTitle className="font-bold">{role}</CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2 text-brand">
                {companyName}
              </CardDescription>
              <div className="hidden sm:block mt-2 text-sm">
                {shortDescription.length > 250 ? (
                  <Markdown>
                    {shortDescription.substring(0, 200) + "..."}
                  </Markdown>
                ) : (
                  <Markdown>{shortDescription}</Markdown>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-end lg:items-center justify-between">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 lg:flex lg:items-center lg:flex-wrap text-gray-600 dark:text-muted-foreground">
              <Badge variant="secondary">
                <BriefcaseBusiness size={16} />
                {experienceMin}-{experienceMax} years
              </Badge>
              <Badge variant="secondary">
                <Timer size={16} />
                {formatEnums(jobType)}
              </Badge>
              <Badge variant="secondary">
                <Building size={16} />
                {formatEnums(jobMode)}
              </Badge>
              <Badge variant="secondary">
                {getCurrencyIcon(currency)} {formatMoney(salary, currency)} /{" "}
                {getSalaryPeriod(salaryPeriod)}
              </Badge>
              <Badge variant="secondary">
                <MapPin size={16} />
                {location}
              </Badge>
            </div>

            <Button asChild variant="brand" size="sm" className="rounded-full">
              <CustomLink href={`/job-seeker/jobs/${id}`}>
                Details <ArrowRight />
              </CustomLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
