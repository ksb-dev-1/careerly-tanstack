"use client";
import Link from "next/link";

import {
  BriefcaseBusiness,
  Building,
  MapPin,
  Timer,
  Wallet,
  Wallet2,
} from "lucide-react";
import { DollarSign, Euro, IndianRupee } from "lucide-react";

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

  function getCurrencyIcon(currency: Currency, size = 16): React.ReactNode {
    switch (currency) {
      case Currency.INR:
        return <IndianRupee size={size} />;
      case Currency.EUR:
        return <Euro size={size} />;
      default:
        return <DollarSign size={size} />;
    }
  }

  function getSalaryPeriod(period: SalaryPeriod): string {
    switch (period) {
      case SalaryPeriod.MONTHLY:
        return "month";
      default:
        return "year";
    }
  }

  function formatJobTypeOrMode(value: JobType | JobMode): string {
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
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-0">
              <div>
                <CardTitle className="text-lg font-bold">{role}</CardTitle>
                <CardDescription className="mt-2">
                  {companyName}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {isFeatured && (
                  <Badge className="bg-brand text-white dark:text-background">
                    Featured
                  </Badge>
                )}
                <Badge variant="default">
                  <Timer /> {formatJobTypeOrMode(jobType)}
                </Badge>
                <Badge variant="default">
                  <Building /> {formatJobTypeOrMode(jobMode)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600 dark:text-muted-foreground flex items-center flex-wrap gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness size={16} />
                <span className="text-sm">
                  {experienceMin}-{experienceMax} years
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={16} />
                <span className="text-sm flex items-center">
                  {getCurrencyIcon(currency)}
                  {salary} / {getSalaryPeriod(salaryPeriod)}
                </span>
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
