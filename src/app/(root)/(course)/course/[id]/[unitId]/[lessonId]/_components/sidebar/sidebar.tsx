"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  SidebarGroup,
} from "@/components/ui/sidebar";
import { type SidebarData } from "../../_queries";
import { GetIcon } from "./icons";
import { Separator } from "@/components/ui/separator";

const pageVariants = {
  initial: { opacity: 0, x: "-100%" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100%" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

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
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3 }}
        className="max-h-[80%] w-[80%] overflow-y-auto rounded-lg bg-background p-6"
      >
        <h2 className="mb-4 text-2xl font-bold">All Units</h2>
        <ul className="space-y-2">
          {data.map((unit) => (
            <li key={unit.id}>
              <Button
                variant="ghost"
                onClick={() => onSelectUnit(unit.id)}
                className="w-full justify-start"
              >
                {unit.name}
              </Button>
            </li>
          ))}
        </ul>
        <Button onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

function LessonsSidebar({
  data,
  courseId,
}: {
  data: SidebarData;
  courseId: string;
}) {
  const { lessonId, unitId } = useParams();
  const [currentUnitIndex, setCurrentUnitIndex] = useState<string>(
    String(unitId) ?? "",
  );
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const currentUnit = useMemo(
    () => data.find((unit) => unit.id === currentUnitIndex),
    [data, currentUnitIndex],
  );

  const nextUnit = useMemo(
    () => data.find((unit) => unit.order === (currentUnit?.order ?? 0) + 1),
    [data, currentUnit],
  );

  const prevUnit = useMemo(
    () => data.find((unit) => unit.order === (currentUnit?.order ?? 0) - 1),
    [data, currentUnit],
  );

  const handleNextUnit = useCallback(() => {
    if (nextUnit) {
      setCurrentUnitIndex(nextUnit.id);
    }
  }, [nextUnit]);

  const handlePrevUnit = useCallback(() => {
    if (prevUnit) {
      setCurrentUnitIndex(prevUnit.id);
    }
  }, [prevUnit]);

  const handleLessonClick = useCallback(
    ({ unitId }: { lessonId: string; unitId: string }) => {
      setCurrentUnitIndex(unitId);
    },
    [],
  );

  const toggleOverlay = useCallback(() => {
    setIsOverlayOpen((prev) => !prev);
  }, []);

  const handleSelectUnit = useCallback((unitId: string) => {
    setCurrentUnitIndex(unitId);
    setIsOverlayOpen(false);
  }, []);

  if (!currentUnit) {
    return null;
  }

  return (
    <SidebarGroup
      className="rounded-3xl "
    >
      <ScrollArea className="h-[calc(100vh-64px)] p-4 text-sm">
        <div className="mb-4 flex items-center justify-between text-gray-500">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevUnit}
            disabled={!prevUnit}
            aria-label="Previous Unit"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={toggleOverlay}
            className=""
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
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentUnit.id}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="space-y-2"
          >
            {currentUnit.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                onClick={() =>
                  handleLessonClick({
                    lessonId: lesson.id,
                    unitId: lesson.unitId,
                  })
                }
                className={`flex flex-col hover:bg-accent ${lessonId === lesson.id ? "bg-muted text-black font-semibold" : "text-gray-500"}`}
                href={
                  lesson.pureLink ? lesson.embeds.embedUrl : `/course/${courseId}/unit/${lesson.unitId}/lesson/${lesson.id}`
                }
                target={
                  lesson.pureLink ? "_blank" : "_self"
                }
              >
                <div className={`flex items-center text-md rounded-md p-2 `}>
                  <GetIcon type={lesson.contentType} />
                  <span className="ml-2">{lesson.name}</span>
                </div>
                <Separator className='' orientation='horizontal' />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
      {
        isOverlayOpen && (
          <Overlay
            data={data}
            onSelectUnit={handleSelectUnit}
            onClose={toggleOverlay}
          />
        )
      }
    </SidebarGroup >
  );
}

export const LessonSidebar = memo(LessonsSidebar);
