"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function CoursesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") ?? "");
  const [subjectId, setSubjectId] = useState(
    searchParams.get("subjectId") ?? "",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (subjectId) params.set("subjectId", subjectId);
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Course Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by course name"
          className="mt-1"
        />
      </div>
      <div>
        <Label
          htmlFor="subjectId"
          className="text-sm font-medium text-gray-700"
        >
          Subject ID
        </Label>
        <Input
          id="subjectId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder="Filter by subject ID"
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </form>
  );
}
