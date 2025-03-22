"use client";;
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTRPC } from "@/trpc/react";

import { useQuery } from "@tanstack/react-query";

const SEARCH_HISTORY_KEY = "searchHistoryOCWOverall";

export function SearchDropdownComponent() {
  const api = useTRPC();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);

  const params = useParams();

  // Load search history from localStorage on component mount
  React.useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory) as string[]);
      } catch (error) {
        console.error("Error loading search history:", error);
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  React.useEffect(() => {
    if (params.lesson) {
      setSearch(
        typeof params.lesson === "string"
          ? params.lesson.replaceAll("-", " ")
          : "",
      );
    }
  }, [params]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Use tRPC query for search
  const searchQuery = useQuery(api.search.search.queryOptions(
    { q: search },
    {
      enabled: search.length > 0,
    },
  ));

  const searchResults = searchQuery.data ?? {
    courses: [],
    units: [],
    lessons: [],
  };
  const isLoading = searchQuery.isLoading;

  const handleAddToHistory = (item: string) => {
    if (!item.trim()) return; // Don't add empty strings

    // Remove duplicates and keep only the last 5 searches
    const newHistory = [item, ...searchHistory]
      .filter((value, index) => {
        return value === item ? index === 0 : true;
      })
      .slice(0, 5);

    setSearchHistory(newHistory);
  };

  const handleSelect = ({
    id,
    type,
  }: {
    id: string;
    type: "course" | "unit" | "lesson";
  }) => {
    setOpen(false);

    // Add the search term to history when selecting from results
    handleAddToHistory(search);

    if (type === "course") {
      router.push(`/course/${id}`);
    } else if (type === "unit") {
      router.push(`/unit/${id}`);
    } else if (type === "lesson") {
      router.push(`/lesson/${id}`);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 rounded-2xl p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 rounded-xl xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <div className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded-2xl px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type to search..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {isLoading ? <CommandItem disabled>Searching...</CommandItem> : null}

          {/* Show search history when search input is empty */}
          {search === "" && searchHistory.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {searchHistory.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    setSearch(item);
                    handleAddToHistory(item);
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults.courses.length > 0 && (
            <CommandGroup heading="Courses">
              {searchResults.courses.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect({ id: item.id, type: "course" })}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {searchResults.units.length > 0 && (
            <CommandGroup heading="Units">
              {searchResults.units.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect({ id: item.id, type: "unit" })}
                >
                  {item.name}{" "}
                  <p className="text-xs text-gray-400"> | {item.courseName}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {searchResults.lessons.length > 0 && (
            <CommandGroup heading="Lessons">
              {searchResults.lessons.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect({ id: item.id, type: "lesson" })}
                >
                  {item.name}
                  <p className="text-xs text-gray-400">
                    | {item.unitName} | {item.courseName}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
