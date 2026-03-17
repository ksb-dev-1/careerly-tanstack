import {
  ApplicationStatus,
  Currency,
  JobMode,
  JobStatus,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/browser";

export type JobListItem = {
  id: string;
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
  appliedOn: Date | null;
  applicationStatus: ApplicationStatus | null;
  description: string;
};

export type JobListApiResponse = {
  success: boolean;
  jobs?: JobListItem[];
  totalCount?: number;
  totalPages?: number;
  error?: string;
};

export type BookmarksApiResponse = {
  success: boolean;
  bookmarks?: JobListItem[];
  error?: string;
};
