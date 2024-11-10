"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookIcon, ChevronLeftIcon } from "lucide-react";
import { memo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SidebarData } from "../../_queries";
import { useParams } from "next/navigation";

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function LessonsSidebar(props: { data: SidebarData; courseId: string }) {
  const { data, courseId } = props;
  const { lessonId, unitId } = useParams();
  const [currentUnitIndex, setCurrentUnitIndex] = useState(unitId);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const currentUnit = data.find((unit) => unit.id === currentUnitIndex);
  const nextUnit = data.find(
    (unit) => unit.order === (currentUnit?.order ?? 0) + 1,
  );

  const prevUnit = data.find(
    (unit) => unit.order === (currentUnit?.order ?? 0) - 1,
  );

  if (!currentUnit) {
    return null;
  }

  const handleNextUnit = () => {
    if (nextUnit) {
      setCurrentUnitIndex(nextUnit.id);
    }
  };

  const handlePrevUnit = () => {
    if (prevUnit) {
      setCurrentUnitIndex(prevUnit.id);
    }
  };

  const handleLessonClick = ({
    unitId,
  }: {
    lessonId: string;
    unitId: string;
  }) => {
    setCurrentUnitIndex(unitId);
  };

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

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <div className="h-min-screen relative w-[408px] overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="flex items-center justify-center bg-[#3f3f46] p-4">
        <BookIcon className="h-6 w-6 text-white" />
        <h1 className="ml-2 text-lg text-white">Intro to CS</h1>
      </div>
      <ScrollArea className="p-4 text-sm">
        <div className="mb-4 flex items-center justify-between text-[#6e6e73]">
          {prevUnit ? (
            <button
              className={`flex items-center ${!prevUnit ? `text-muted-foreground` : null}`}
              onClick={handlePrevUnit}
              disabled={!prevUnit}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}

          <h2
            onClick={toggleOverlay}
            className="cursor-pointer font-semibold text-black"
          >
            {currentUnit.name}
          </h2>
          {nextUnit ? (
            <button
              className="flex items-center"
              onClick={handleNextUnit}
              disabled={!nextUnit}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}
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
                onClick={() =>
                  handleLessonClick({
                    lessonId: lesson.id,
                    unitId: lesson.unitId,
                  })
                }
                key={lesson.id}
                className={`flex items-center rounded-md p-2 hover:bg-accent ${
                  lessonId === lesson.id ? "bg-muted" : ""
                }`}
                href={`/course/${courseId}/${lesson.unitId}/${lesson.id}`}
              >
                <TextIcon className="h-4 w-4 text-[#6e6e73]" />
                <span className="ml-2">{lesson.title}</span>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="max-h-[80%] w-[80%] overflow-y-auto rounded-lg bg-transparent p-6"
            >
              <h2 className="mb-4 text-2xl font-bold">All Units</h2>
              <ul className="space-y-2">
                {data.map((unit) => (
                  <li key={unit.id}>
                    <button
                      onClick={() => {
                        setCurrentUnitIndex(unit.id);
                        setIsOverlayOpen(false);
                      }}
                      className="border-none text-white hover:underline"
                    >
                      {unit.name}
                    </button>
                  </li>
                ))}
              </ul>
              <Button onClick={toggleOverlay} className="w-full">
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}
export default memo(LessonsSidebar);
