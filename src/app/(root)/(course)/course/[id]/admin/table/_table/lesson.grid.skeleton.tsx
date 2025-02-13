
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = 50;
const columns = [
  "ID",
  "Name",
  "Unit",
  "Published",
  "Pure Link",
  "Content Type",
  "Embed Password",
  "Embed URL",
];


export const LessonTableSkeleton = () => {
  return (
    <div className="p-2">
      <div className="h-2" />
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((header) => (
              <TableHead key={header}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-6 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
