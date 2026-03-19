import { prisma } from "@/lib/prisma";
import { JobListItem } from "@/types/api";

export async function fetchBookmarks(userId: string): Promise<JobListItem[]> {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId,
    },

    select: {
      job: {
        select: {
          id: true,
          companyLogo: true,
          companyName: true,
          role: true,
          skills: {
            include: {
              skill: true,
            },
          },
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
          description: true,
          createdAt: true,
          updatedAt: true,

          applications: {
            where: { userId },
            take: 1,
            select: {
              createdAt: true,
              applicationStatus: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  return bookmarks.map(({ job }) => ({
    ...job,
    isBookmarked: true,
    appliedOn: job.applications[0]?.createdAt ?? null,
    applicationStatus: job.applications[0]?.applicationStatus ?? null,
  }));
}
