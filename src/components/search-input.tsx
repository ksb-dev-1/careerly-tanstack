"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Info, Search } from "lucide-react";

import { Input } from "./ui/input";

export function SearchInput() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const currentSearch = params.get("search") || "";

    if (currentSearch === search.trim()) return;

    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full relative">
      <Input
        className="w-full px-2 sm:p-4 text-sm sm:text-base"
        placeholder="Enter company, role or skill"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button
        onClick={handleSearch}
        className="bg-brand text-white dark:text-background hover:bg-brand-hover absolute top-0 right-0 h-9 px-3 flex items-center justify-center rounded-tr-md rounded-br-md"
      >
        <Search size={18} />
      </button>
    </div>
  );
}

{
  /* <p className="mt-4 text-sm text-gray-600 dark:text-muted-foreground flex items-center gap-2">
        <Info size={16} /> For more accurate results, enter the full company
        name, role, or skill.
      </p> */
}
