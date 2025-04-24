"use client";
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
import { useDebounce } from "@/hooks/use-debounce"; // Assuming you have this hook

const SEARCH_HISTORY_KEY = "searchHistoryOCWOverall";
const DEBOUNCE_DELAY = 300; // milliseconds

export function SearchDropdownComponent() {
  const api = useTRPC();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);

  // Debounce the search term
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

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
      const initialSearch =
        typeof params.lesson === "string"
          ? params.lesson.replaceAll("-", " ")
          : "";
      setSearch(initialSearch);
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

  // Use tRPC query for search, using the debounced value
  const searchQuery = useQuery(
    api.search.search.queryOptions(
      { q: debouncedSearch },
      {
        enabled: debouncedSearch.length > 0,
      },
    ),
  );

  const searchResults = searchQuery.data ?? {
    courses: [],
    units: [],
    lessons: [],
  };
  // isFetching indicates a fetch is in progress (background or initial)
  // isLoading is true only on initial load without data
  const isLoading = searchQuery.isFetching;

  const handleAddToHistory = (item: string) => {
    if (!item.trim()) return;

    const newHistory = [item, ...searchHistory]
      .filter(
        (value, index, self) => self.findIndex((v) => v === value) === index,
      )
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
    handleAddToHistory(search); // Add the term used for the search

    if (type === "course") {
      router.push(`/course/${id}`);
    } else if (type === "unit") {
      router.push(`/unit/${id}`);
    } else if (type === "lesson") {
      router.push(`/lesson/${id}`);
    }
    // Optional: Clear search after selection?
    // setSearch('');
  };

  // Determine if we should show the "No results" message
  const showNoResults =
    !isLoading && // Not currently loading
    debouncedSearch.length > 0 && // User has typed something (debounced)
    searchResults.courses.length === 0 &&
    searchResults.units.length === 0 &&
    searchResults.lessons.length === 0;

  // Determine if we should show the history
  const showHistory =
    !isLoading && // Not currently loading
    search === "" && // Input is empty
    searchHistory.length > 0;

  return (
    <>
      <Button
        variant="outline"
        className="text-primary relative h-9 w-9 rounded-2xl border-black/30 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 rounded-xl xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <div className="pointer-events-none absolute top-2 right-1.5 hidden h-6 items-center gap-1 rounded-2xl px-1.5 font-mono text-[10px] font-medium opacity-100 select-none xl:flex">
          <span className="text-xs">⌘</span>K
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type to search..."
          value={search}
          onValueChange={setSearch}
        />
        {/* Disable cmdk's built-in filtering. We rely on the backend search. */}
        <CommandList shouldFilter={false}>
          {/* Show loading indicator */}
          {isLoading && debouncedSearch.length > 0 && (
            <CommandItem disabled>Searching...</CommandItem>
          )}

          {/* Show Empty state */}
          {showNoResults && <CommandEmpty>No results found.</CommandEmpty>}

          {/* Show search history */}
          {showHistory && (
            <CommandGroup heading="Recent Searches">
              {searchHistory.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    setSearch(item);
                  }}
                  value={`history-${item}`} // Keep unique value
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Show results only when not loading and debounced search has value */}
          {!isLoading && debouncedSearch.length > 0 && (
            <>
              {searchResults.courses.length > 0 && (
                <CommandGroup heading="Courses">
                  {searchResults.courses.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() =>
                        handleSelect({ id: item.id, type: "course" })
                      }
                      value={`course-${item.id}`}
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
                      onSelect={() =>
                        handleSelect({ id: item.id, type: "unit" })
                      }
                      value={`unit-${item.id}`}
                    >
                      {item.name}{" "}
                      <span className="ml-2 text-xs text-gray-400">
                        {" "}
                        | {item.courseName}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {searchResults.lessons.length > 0 && (
                <CommandGroup heading="Lessons">
                  {searchResults.lessons.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() =>
                        handleSelect({ id: item.id, type: "lesson" })
                      }
                      value={`lesson-${item.id}`}
                    >
                      {item.name}
                      <span className="ml-2 text-xs text-gray-400">
                        | {item.unitName} | {item.courseName}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
