import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";
import { JobListApiResponse } from "@/types/api";

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
    const jobs = await prisma.job.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        employerId: true,
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
          where: {
            userId: session.user.id,
          },
          select: {
            id: true,
          },
        },
      },
    });

    const formattedJobs = jobs.map(({ bookmarks, ...job }) => ({
      ...job,
      isBookmarked: bookmarks.length > 0,
    }));

    return NextResponse.json(
      {
        success: true,
        data: formattedJobs,
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
