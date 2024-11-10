"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { cn } from "@/lib/utils";

type SearchResult = {
  courses: Array<{ id: string; name: string }>;
  units: Array<{ id: string; name: string }>;
  lessons: Array<{ id: string; name: string }>;
};

export function SearchDropdownComponent() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResult>({
    courses: [],
    units: [],
    lessons: [],
  });

  const router = useRouter();
  const params = useParams();

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

  React.useEffect(() => {
    if (search.length === 0) {
      setSearchResults({ courses: [], units: [], lessons: [] });
    } else {
      setIsLoading(true);

      const searchedFor = search;
      fetch(`/api/search?q=${search}`)
        .then(async (results) => {
          if (search !== searchedFor) {
            return;
          }
          const json = (await results.json()) as SearchResult;
          setIsLoading(false);
          setSearchResults(json);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Something went wrong, please try again later.");
        });
    }
  }, [search]);

  const handleSelect = (id: string, type: "course" | "unit" | "lesson") => {
    setOpen(false);
    // Here you would typically navigate to the selected item
    // For example: router.push(`/${type}s/${id}`)
    console.log(`Selected ${type} item:`, id);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
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
          {searchResults.courses.length > 0 && (
            <CommandGroup heading="Courses">
              {searchResults.courses.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item.id, "course")}
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
                  onSelect={() => handleSelect(item.id, "unit")}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {searchResults.lessons.length > 0 && (
            <CommandGroup heading="Lessons">
              {searchResults.lessons.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item.id, "lesson")}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
