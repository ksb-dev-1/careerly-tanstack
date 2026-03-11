import { Metadata } from "next";

import { Bookmarks } from "./bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks - Careerly",
  description: "View and manage all your bookmarks.",
};

export default function BookmarksPage() {
  return <Bookmarks />;
}
