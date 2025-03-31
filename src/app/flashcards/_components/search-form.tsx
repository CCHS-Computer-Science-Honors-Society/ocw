"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export function SearchForm() {
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        name="query"
        placeholder="Search flashcards..."
        required
      />
      <Button type="submit" disabled={pending}>
        {pending ? (
          <SearchIcon className="h-4 w-4 animate-spin" />
        ) : (
          <SearchIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
