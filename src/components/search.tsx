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
import type { Result as SearchResult } from "@/app/api/search/route";
export function SearchDropdownComponent() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResult>({
    courses: [],
    units: [],
    lessons: [],
  });

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
          setIsLoading(false);
        });
    }
  }, [search]);

  const handleSelect = ({
    id,
    type,
  }: {
    id: string;
    type: "course" | "unit" | "lesson";
  }) => {
    setOpen(false);
    console.log(type);
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
