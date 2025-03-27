"use client";

import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { useExplore } from "./context";

interface Course {
  name: string;
  link: string;
  isNew?: boolean;
}

interface Category {
  name: string;
  courses: Course[];
}

interface Section {
  title: string;
  categories: Category[];
}

const navigationData: Section[] = [
  {
    title: "MATH",
    categories: [
      {
        name: "Calculus",
        courses: [
          {
            name: "Precalculus Honors",
            link: "/course/precalculus-honors",
          },
          {
            name: "AP Calculus",
            link: "/course/ap-calculus",
          },
          {
            name: "Calculus 3/Diff. Eq.",
            link: "/course/calculus-3-diff-eq",
          },
        ],
      },
      {
        name: "Advanced Courses",
        courses: [
          {
            name: "Abstract Math/Linear Algebra",
            link: "/course/abstract-math-linear-algebra",
          },
        ],
      },
      {
        name: "Statistics",
        courses: [
          {
            name: "AP Statistics",
            link: "/course/ap-statistics",
          },
        ],
      },
      {
        name: "Geometry",
        courses: [
          {
            name: "Geometry",
            link: "/course/geometry",
          },
        ],
      },
    ],
  },
  {
    title: "Social Studies",
    categories: [
      {
        name: "History",
        courses: [
          {
            name: "AP Art History",
            link: "/course/ap-art-history",
          },
          {
            name: "AP US History",
            link: "/course/ap-us-history",
          },
          {
            name: "AP World History",
            link: "/course/ap-world-history",
          },
          {
            name: "CP US History",
            link: "/course/cp-us-history",
          },
        ],
      },
      {
        name: "Economics",
        courses: [
          {
            name: "AP Macroeconomics",
            link: "/course/ap-macroeconomics",
          },
          {
            name: "AP Microeconomics",
            link: "/course/ap-microeconomics",
          },
        ],
      },
      {
        name: "Government",
        courses: [
          {
            name: "AP US Government and Politics",
            link: "/course/sl9iwdcw88glelgc6haolffl",
          },
          {
            name: "AP Comparative Government",
            link: "/course/hsiynw0o45xjkh405z2l405y",
          },
        ],
      },
    ],
  },
  {
    title: "SCIENCE",
    categories: [
      {
        name: "Physical Science",
        courses: [
          {
            name: "Physical Science Honors",
            link: "/course/physical-science-honors",
          },
          {
            name: "CP Physical Science",
            link: "/course/cp-physical-science",
          },
        ],
      },
      {
        name: "Biology",
        courses: [
          {
            name: "AP Biology",
            link: "/course/apbio",
          },
          {
            name: "Honors Biology",
            link: "/course/honors-biology",
          },
        ],
      },
      {
        name: "Physics",
        courses: [
          {
            name: "AP Physics C",
            link: "/course/ap-physics-c",
          },
        ],
      },
      {
        name: "Chemistry",
        courses: [
          {
            name: "AP Chemistry",
            link: "/course/ap-chemistry",
          },
        ],
      },
    ],
  },
];

const containerVariants = {
  open: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.3, ease: "easeInOut" },
    },
  },
  closed: {
    opacity: 0,
    transition: {
      opacity: { duration: 0.2, ease: "easeInOut" },
    },
  },
};

function ExploreContent() {
  const { isOpen, setIsOpen, isMobile } = useExplore();

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-max flex-row items-center justify-center gap-2 rounded-md p-2 text-sm font-medium text-primary hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-label="Toggle course navigation"
      >
        Explore
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="relative top-[1px] ml-2 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className={`fixed inset-0 z-40 bg-background ${isMobile ? "overflow-y-auto" : ""}`}
            style={{ top: isMobile ? "0" : "64px" }}
          >
            {isMobile && (
              <div className="sticky top-0 z-50 border-b bg-white p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-600"
                >
                  Close
                </button>
              </div>
            )}
            <ScrollArea
              className={isMobile ? "h-full" : "h-[calc(100vh-64px)]"}
            >
              <div className="relative h-full min-h-screen">
                <div className="h-full w-full p-6 md:p-20">
                  <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {navigationData.map((section) => (
                      <div key={section.title} className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-500">
                          {section.title}
                        </h3>
                        {section.categories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            {category.name !== section.title && (
                              <h4 className="text-sm font-medium">
                                {category.name}
                              </h4>
                            )}
                            <ul className="space-y-2">
                              {category.courses.map((course) => (
                                <motion.li
                                  key={course.name}
                                  whileHover={{ scale: 1.003 }}
                                >
                                  <Link
                                    prefetch
                                    href={course.link}
                                    className="group flex items-center text-sm text-gray-700 hover:text-blue-600"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span className="flex-1">
                                      {course.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      {course.isNew && (
                                        <Badge variant="new">NEW</Badge>
                                      )}
                                    </div>
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Explore() {
  return <ExploreContent />;
}
