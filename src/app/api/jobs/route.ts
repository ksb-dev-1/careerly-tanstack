import { NextRequest, NextResponse } from "next/server";

import {
  ApplicationStatus,
  Currency,
  JobMode,
  JobStatus,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/browser";
import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";

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
};

export type pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

export type JobListApiResponse = {
  success: boolean;
  data?: JobListItem[];
  pagination?: pagination;
  error?: string;
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<JobListApiResponse>> {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication required",
      },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "10");

    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,
      jobStatus: JobStatus.OPEN,
    };

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,

        select: {
          id: true,
          companyLogo: true,
          companyName: true,
          role: true,
          jobType: true,
          jobMode: true,
          location: true,
          salary: true,
          salaryPeriod: true,
          currency: true,
          experienceMin: true,
          experienceMax: true,
          openings: true,
          jobStatus: true,
          isFeatured: true,
          createdAt: true,
          updatedAt: true,

          bookmarks: {
            where: { userId: session.user.id },
            select: { id: true },
          },

          applications: {
            where: { userId: session.user.id },
            select: {
              createdAt: true,
              applicationStatus: true,
            },
          },
        },
      }),

      prisma.job.count({ where }),
    ]);

    const formattedJobs: JobListItem[] = jobs.map(
      ({ bookmarks, applications, ...job }) => ({
        ...job,
        isBookmarked: bookmarks.length > 0,
        appliedOn: applications[0]?.createdAt ?? null,
        applicationStatus: applications[0]?.applicationStatus ?? null,
      }),
    );

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        success: true,
        data: formattedJobs,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/jobs error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch jobs",
      },
      { status: 500 },
    );
  }
}
