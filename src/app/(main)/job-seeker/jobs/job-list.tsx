// "use client";

// import { useSearchParams } from "next/navigation";

// import { useQuery } from "@tanstack/react-query";

// import { EmptyState } from "@/components/errors/empty-state";
// import { ServerError } from "@/components/errors/server-error";
// import { Unauthenticated } from "@/components/errors/unauthenticated";
// import { JobPagination } from "@/components/pagination";
// import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
// import { JobListApiResponse } from "@/types/api";

// export function JobList() {
//   const searchParams = useSearchParams();

//   const page = searchParams.get("page") ?? "1";
//   const limit = searchParams.get("limit") ?? "6";
//   const jobType = searchParams.get("jobType");
//   const jobMode = searchParams.get("jobMode");
//   const experience = searchParams.get("experience");

//   const { data, isLoading, error } = useQuery<
//     JobListApiResponse,
//     { status: number; message?: string }
//   >({
//     queryKey: ["jobs", page, limit, jobType, jobMode, experience],
//     queryFn: async () => {
//       const params = new URLSearchParams();

//       params.set("page", page);
//       params.set("limit", limit);
//       if (jobType) params.set("jobType", jobType);
//       if (jobMode) params.set("jobMode", jobMode);
//       if (experience) params.set("experience", experience);

//       const res = await fetch(`/api/jobs?${params.toString()}`);
//       const body: JobListApiResponse = await res.json();

//       if (!body.success) {
//         throw {
//           status: res.status,
//           message: body.error,
//         };
//       }
//       return body;
//     },
//   });

//   if (isLoading) return <JobListSkeleton />;

//   if (error) {
//     if (error.status === 401) return <Unauthenticated />;
//     if (error.status === 500) return <ServerError />;
//     return <ServerError />;
//   }

//   const jobs = data?.jobs;
//   const totalPages = data?.totalPages;

//   if (!jobs || jobs.length === 0) {
//     return <EmptyState />;
//   }

//   return (
//     <div>
//       {jobs.map((job) => (
//         <div key={job.id}>
//           <p>{job.companyName}</p>
//         </div>
//       ))}

//       {totalPages && totalPages > 1 && (
//         <JobPagination totalPages={totalPages} />
//       )}
//     </div>
//   );
// }

"use client";

import { Bookmark } from "lucide-react";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { JobPagination } from "@/components/pagination";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFetchJobs } from "@/hooks/useFetchJobs";

export function JobList() {
  const { data, isLoading, error } = useFetchJobs();

  if (isLoading) return <JobListSkeleton />;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  const jobs = data?.jobs;
  const totalPages = data?.totalPages;

  if (!jobs || jobs.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const {
          companyLogo,
          companyName,
          role,
          isFeatured,
          isBookmarked,
          jobMode,
          jobType,
          salary,
          salaryPeriod,
          currency,
          experienceMin,
          experienceMax,
          applicationStatus,
          location,
          openings,
          createdAt,
        } = job;

        return (
          <Card
            key={job.id}
            className="hover:shadow-md transition cursor-pointer"
          >
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex gap-3 items-center">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt={companyName}
                    className="w-12 h-12 rounded-md border object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-muted border"></div>
                )}

                <div>
                  <h3 className="font-semibold text-lg">{role}</h3>
                  <p className="text-sm text-muted-foreground">{companyName}</p>
                </div>
              </div>

              {isBookmarked && (
                <Bookmark className="w-5 h-5 text-primary fill-primary" />
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {isFeatured && <Badge>Featured</Badge>}
                <Badge variant="secondary">{jobType}</Badge>
                <Badge variant="secondary">{jobMode}</Badge>
                <Badge variant="outline">{location}</Badge>
              </div>

              {/* Job Info */}
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <p>
                  💰 {currency} {salary} / {salaryPeriod}
                </p>

                <p>
                  🧑‍💻 {experienceMin}-{experienceMax} yrs
                </p>

                <p>👥 {openings} openings</p>

                <p>Posted {new Date(createdAt).toLocaleDateString()}</p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                {applicationStatus ? (
                  <Badge variant="outline">Applied ({applicationStatus})</Badge>
                ) : (
                  <Button size="sm">Apply</Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {totalPages && totalPages > 1 && (
        <JobPagination totalPages={totalPages} />
      )}
    </div>
  );
}
