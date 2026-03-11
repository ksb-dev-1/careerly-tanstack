import {
  Currency,
  JobMode,
  JobStatus,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/browser";

export type JobListItem = {
  id: string;
  employerId: string | null;
  companyLogo: string | null;
  companyName: string;
  role: string;
  jobType: JobType;
  jobMode: JobMode;
  location: string;
  salary: number;
  salaryPeriod: SalaryPeriod;
  currency: Currency;
  experienceMin: number | null;
  experienceMax: number | null;
  openings: number;
  jobStatus: JobStatus;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  isBookmarked: boolean;
};

export type JobListApiResponse = {
  success: boolean;
  data?: JobListItem[];
  error?: string;
};
