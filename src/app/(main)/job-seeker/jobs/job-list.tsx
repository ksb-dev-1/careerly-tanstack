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

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { JobCard } from "@/components/job-card";
import { JobPagination } from "@/components/pagination";
import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
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
    <div>
      <div className="grid md:grid-cols-1 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {totalPages && totalPages > 1 && (
        <JobPagination totalPages={totalPages} />
      )}
    </div>
  );
}
