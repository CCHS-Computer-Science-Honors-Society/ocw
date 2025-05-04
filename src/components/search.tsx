"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTRPC } from "@/trpc/react";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

const SEARCH_HISTORY_KEY = "ocwSearchHistory";
const DEBOUNCE_DELAY = 300; // milliseconds

interface SearchItemBase {
  id: string;
  name: string;
}
interface CourseItem extends SearchItemBase {
  type: "course";
}
interface UnitItem extends SearchItemBase {
  type: "unit";
  courseName: string;
}
interface LessonItem extends SearchItemBase {
  type: "lesson";
  courseName: string;
  unitName: string;
}
type SearchItem = CourseItem | UnitItem | LessonItem;

export function SearchDropdownComponent() {
  const api = useTRPC();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const params = useParams();

  React.useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(
            parsedHistory.filter((item) => typeof item === "string"),
          );
        }
      } catch (error) {
        console.error("Error loading search history:", error);
        localStorage.removeItem(SEARCH_HISTORY_KEY); // Clear corrupted history
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Removed useEffect for params - let user initiate search

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

  const searchQuery = useQuery(
    api.search.search.queryOptions(
      { q: debouncedSearch },
      {
        enabled: debouncedSearch.trim().length > 0, // Ensure enabled only on non-empty search
      },
    ),
  );

  const searchResults = searchQuery.data; // Can be undefined initially
  const isLoading = searchQuery.isFetching; // Use isFetching for loading state with debounce

  const handleAddToHistory = (item: string) => {
    if (!item?.trim()) return;

    const newHistory = [item, ...searchHistory]
      .filter(
        (value, index, self) => self.findIndex((v) => v === value) === index,
      )
      .slice(0, 5);

    setSearchHistory(newHistory);
  };

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    handleAddToHistory(item.name);

    // Navigate based on type
    if (item.type === "course") {
      router.push(`/course/${item.id}`);
    } else if (item.type === "unit") {
      router.push(`/unit/${item.id}`); // Assuming unit route exists
    } else if (item.type === "lesson") {
      router.push(`/lesson/${item.id}`);
    }
    // setSearch(''); // Optional: Clear search on select
  };

  const hasResults =
    searchResults &&
    (searchResults.courses.length > 0 ||
      searchResults.units.length > 0 ||
      searchResults.lessons.length > 0);

  const showNoResults =
    !isLoading && debouncedSearch.trim().length > 0 && !hasResults;
  const showHistory =
    !isLoading && search.trim() === "" && searchHistory.length > 0;

  // --- DEBUG LOG ---
  console.log("Search State:", {
    search,
    debouncedSearch,
    isLoading,
    data: searchResults, // Log the potentially undefined data
    error: searchQuery.error,
    hasResults,
    showNoResults,
    showHistory,
    enabled: debouncedSearch.trim().length > 0,
  });
  // --- END DEBUG LOG ---

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
        <kbd className="bg-muted pointer-events-none absolute top-2 right-1.5 hidden h-6 items-center gap-1 rounded-2xl border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Command shouldFilter={false}>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Type to search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading && debouncedSearch.trim().length > 0 && (
              <div className="text-muted-foreground p-4 text-center text-sm">
                Searching...
              </div>
            )}

            {showNoResults && <CommandEmpty>No results found.</CommandEmpty>}

            {showHistory && (
              <CommandGroup heading="Recent Searches">
                {searchHistory.map((item) => (
                  <CommandItem
                    key={item}
                    onSelect={() => {
                      setSearch(item); // Set search bar to history item on click
                    }}
                    value={item} // Keep unique value
                  >
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {!isLoading && hasResults && (
              <>
                {searchResults.courses.length > 0 && (
                  <CommandGroup heading="Courses">
                    {searchResults.courses.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() =>
                          handleSelect({ ...item, type: "course" })
                        }
                        value={item.name}
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
                          handleSelect({
                            ...item,
                            type: "unit",
                            // Ensure courseName is passed if needed by handleSelect/routing
                            courseName: item.courseName || "Unknown Course",
                          })
                        }
                        value={item.name}
                      >
                        {item.name}{" "}
                        <span className="text-muted-foreground ml-2 text-xs">
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
                          handleSelect({
                            ...item,
                            type: "lesson",
                            // Ensure names are passed if needed
                            unitName: item.unitName || "Unknown Unit",
                            courseName: item.courseName || "Unknown Course",
                          })
                        }
                        value={item.name}
                      >
                        {item.name}
                        <span className="text-muted-foreground ml-2 text-xs">
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
      </Command>
    </>
  );
}
