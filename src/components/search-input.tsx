"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Info, Search } from "lucide-react";

import { Input } from "./ui/input";

export function SearchInput() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="max-w-2xl w-full relative">
      <Input
        className="p-5"
        placeholder="Enter company, role or skill"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <button
        onClick={handleSearch}
        className="bg-brand text-white dark:text-background hover:bg-brand-hover absolute top-px right-0 h-10 px-4 flex items-center justify-center rounded-tr-md rounded-br-md"
      >
        <Search size={18} className="mr-2" /> Search
      </button>

      <p className="mt-3 text-sm text-gray-600 dark:text-muted-foreground flex items-center gap-2">
        <Info size={16} /> For more accurate results, enter the full company
        name, role, or skill.
      </p>
    </div>
  );
}

{
  /* <p className="mt-4 text-sm text-gray-600 dark:text-muted-foreground flex items-center gap-2">
        <Info size={16} /> For more accurate results, enter the full company
        name, role, or skill.
      </p> */
}
