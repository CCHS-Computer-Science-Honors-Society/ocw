"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useCallback, memo } from "react";
import { type SidebarData } from "../../_queries";
import { GetIcon } from "./icons";
import { AnimatePresence, motion } from "framer-motion";

const Overlay = ({
  data,
  onSelectUnit,
  onClose,
}: {
  data: SidebarData;
  onSelectUnit: (unitId: string) => void;
  onClose: () => void;
}) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "-50px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "50px", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-sidebar-background border-sidebar-border max-h-[80vh] w-[90vw] max-w-md overflow-y-auto rounded-lg border p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-sidebar-foreground mb-4 text-xl font-semibold">
          Select Unit
        </h2>
        <ul className="space-y-1">
          {data.map((unit) => (
            <li key={unit.id}>
              <Button
                variant="ghost"
                onClick={() => onSelectUnit(unit.id)}
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full justify-start px-2 py-1.5 text-left"
              >
                {unit.name}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          onClick={onClose}
          className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-6 w-full"
        >
          Close
        </Button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

function UnitLessonNav({
  data,
  courseId,
  initialUnitId,
  initialLessonId,
}: {
  data: SidebarData;
  courseId: string;
  initialUnitId: string;
  initialLessonId: string;
}) {
  const [currentUnitId, setCurrentUnitId] = useState<string>(initialUnitId);
  const [selectedLessonId, setSelectedLessonId] =
    useState<string>(initialLessonId);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const currentUnitIndex = useMemo(
    () => data.findIndex((unit) => unit.id === currentUnitId),
    [data, currentUnitId],
  );

  const currentUnit = useMemo(
    () => (currentUnitIndex !== -1 ? data[currentUnitIndex] : undefined),
    [data, currentUnitIndex],
  );
  const prevUnit = useMemo(
    () => (currentUnitIndex > 0 ? data[currentUnitIndex - 1] : undefined),
    [data, currentUnitIndex],
  );
  const nextUnit = useMemo(
    () =>
      currentUnitIndex !== -1 && currentUnitIndex < data.length - 1
        ? data[currentUnitIndex + 1]
        : undefined,
    [data, currentUnitIndex],
  );

  // Modified: Only update state, do not navigate
  const handleUnitChange = useCallback(
    (newUnitId: string) => {
      setCurrentUnitId(newUnitId);
    },
    [], // Removed courseId and router from dependencies
  );

  const handleNextUnit = useCallback(() => {
    if (nextUnit) {
      handleUnitChange(nextUnit.id);
    }
  }, [nextUnit, handleUnitChange]);

  const handlePrevUnit = useCallback(() => {
    if (prevUnit) {
      handleUnitChange(prevUnit.id);
    }
  }, [prevUnit, handleUnitChange]);

  // This function now only updates the visual selection state
  const handleLessonClick = useCallback((lessonId: string) => {
    setSelectedLessonId(lessonId);
    // Navigation is handled by the Link component itself via its href
  }, []);

  const toggleOverlay = useCallback(() => {
    setIsOverlayOpen((prev) => !prev);
  }, []);

  // Selecting from overlay also only updates state now
  const handleSelectUnitFromOverlay = useCallback(
    (unitId: string) => {
      handleUnitChange(unitId);
      setIsOverlayOpen(false);
    },
    [handleUnitChange],
  );

  if (!currentUnit) {
    return <div className="text-sidebar-foreground p-4">Unit not found.</div>;
  }

  return (
    <>
      <SidebarGroup className="bg-sidebar-background border-sidebar-border sticky top-0 z-10 border-b p-2">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevUnit}
            disabled={!prevUnit}
            aria-label="Previous Unit"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={toggleOverlay}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-[20px] flex-1 truncate px-2 text-center text-sm font-medium"
            aria-haspopup="dialog"
            aria-expanded={isOverlayOpen}
          >
            {currentUnit.name}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextUnit}
            disabled={!nextUnit}
            aria-label="Next Unit"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground disabled:opacity-50"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="list-none">
            {currentUnit.lessons.map((lesson) => (
              <SidebarMenuItem key={lesson.id}>
                <SidebarMenuButton
                  asChild
                  isActive={selectedLessonId === lesson.id}
                  // Use onClick to update visual state *before* navigation potentially happens
                  onClick={() => handleLessonClick(lesson.id)}
                  className="h-auto justify-start py-2 pr-2 pl-3 text-sm"
                >
                  <Link
                    prefetch={false}
                    href={
                      lesson.pureLink
                        ? (lesson.embeds.embedUrl ?? "#")
                        : `/course/${courseId}/${lesson.unitId}/${lesson.id}`
                    }
                    target={lesson.pureLink ? "_blank" : undefined}
                    rel={lesson.pureLink ? "noopener noreferrer" : undefined}
                    // Prevent Link's default onClick if we handle state separately?
                    // No, Link needs its onClick for navigation. handleLessonClick just updates state.
                  >
                    <GetIcon type={lesson.contentType} />
                    <span className="ml-2 truncate">{lesson.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {isOverlayOpen && (
        <Overlay
          data={data}
          onSelectUnit={handleSelectUnitFromOverlay}
          onClose={toggleOverlay}
        />
      )}
    </>
  );
}

export const UnitLessonNavigation = memo(UnitLessonNav);
