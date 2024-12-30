"use client";

import { useQueryState, parseAsInteger } from "nuqs";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  const [search, setSearch] = useQueryState("query");
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );

  return (
    <div className="flex flex-row">
      <Input
        placeholder="Search flashcards..."
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow"
      />
      <Input
        id="number-input"
        type="number"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value))}
        className="h-full w-full border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
