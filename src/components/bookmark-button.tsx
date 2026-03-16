"use client";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi2";
import { toast } from "sonner";

import {
  ToggleBookmark,
  ToggleBookmarkActionError,
} from "@/actions/job-seeker/toggle-bookmark";
import { Button } from "@/components/ui/button";
import { useClientSession } from "@/hooks/useClientSession";
import { cn } from "@/lib/utils";

import { Spinner } from "./spinner";

interface BookmarkButtonProps {
  jobId: string;
  isBookmarked?: boolean;
  className?: string;
}

export function BookmarkButton({
  jobId,
  isBookmarked,
  className,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { data: session, isPending } = useClientSession();
  const jobSeekerId = session?.user.id;
  const queryClient = useQueryClient();

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  // Apply for job tanstack mutation
  const { isPending: isMutating, mutate } = useMutation({
    mutationFn: async () => {
      if (!jobSeekerId) throw new Error("Authentication required");

      return ToggleBookmark(jobId);
    },

    onSuccess: (response) => {
      if (response.success) {
        setBookmarked(response.success ? !bookmarked : bookmarked);
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
      } else {
        toast.error(response.message);
      }
    },

    onError: (error: ToggleBookmarkActionError) => {
      toast.error(error.message);
    },
  });

  // Handle job apply
  const handleToggleBookmark = () => {
    mutate();
  };

  const loading = isMutating || isPending;

  return (
    <button
      type="button"
      className={cn("text-brand", className)}
      aria-label={`${bookmarked ? "remove from bookmarks" : "add to bookmarks"}`}
      disabled={loading}
      onClick={handleToggleBookmark}
    >
      {loading ? (
        <Spinner size={20} color="text-brand" />
      ) : bookmarked ? (
        <BookmarkCheck size={20} />
      ) : (
        <Bookmark size={20} />
      )}
    </button>
  );
}
