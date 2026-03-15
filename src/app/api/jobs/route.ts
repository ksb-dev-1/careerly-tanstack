import { NextRequest, NextResponse } from "next/server";

import { JobMode, JobStatus, JobType, Prisma } from "@/generated/prisma/client";
import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";
import { JobListApiResponse, JobListItem } from "@/types/api";

function parseJobTypes(value: string | null): JobType[] | undefined {
  if (!value) return undefined;
  const values = value.split(",").map((v) => v.trim());
  const valid = values.filter((v) =>
    Object.values(JobType).includes(v as JobType),
  ) as JobType[];
  return valid.length > 0 ? valid : undefined;
}

function parseJobModes(value: string | null): JobMode[] | undefined {
  if (!value) return undefined;
  const values = value.split(",").map((v) => v.trim());
  const valid = values.filter((v) =>
    Object.values(JobMode).includes(v as JobMode),
  ) as JobMode[];
  return valid.length > 0 ? valid : undefined;
}

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

    const page = Math.max(
      parseInt(searchParams.get("page") ?? "1", 10) || 1,
      1,
    );
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "10", 10) || 10,
      50,
    );
    const jobTypes = parseJobTypes(searchParams.get("jobType"));
    const jobModes = parseJobModes(searchParams.get("jobMode"));
    const experience = searchParams.get("experience");
    const [expMinStr, expMaxStr] = (experience ?? "").split("-");
    const expMin = parseInt(expMinStr, 10);
    const expMax = parseInt(expMaxStr, 10);
    const hasExperience = !isNaN(expMin) && !isNaN(expMax);
    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {
      isDeleted: false,
      jobStatus: JobStatus.OPEN,
    };

    if (jobTypes) {
      where.jobType = { in: jobTypes };
    }

    if (jobModes) {
      where.jobMode = { in: jobModes };
    }

    if (hasExperience) {
      where.AND = [
        {
          OR: [{ experienceMin: null }, { experienceMin: { lte: expMax } }],
        },
        {
          OR: [{ experienceMax: null }, { experienceMax: { gte: expMin } }],
        },
      ];
    }

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
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
            take: 1,
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
        jobs: formattedJobs,
        totalCount,
        totalPages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/jobs error:", { userId: session.user.id, error });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch jobs",
      },
      { status: 500 },
    );
  }
}

// ...(jobTypes && { jobType: { in: jobTypes } }),
//     ...(jobModes && { jobMode: { in: jobModes } }),
//     ...(hasExperience && {
//       AND: [
//         {
//           OR: [
//             { experienceMin: null },
//             { experienceMin: { lte: expMax } }, // job's min <= user's max
//           ],
//         },
//         {
//           OR: [
//             { experienceMax: null },
//             { experienceMax: { gte: expMin } }, // job's max >= user's min
//           ],
//         },
//       ],
//     }),
