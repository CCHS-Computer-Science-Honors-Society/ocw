'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '../ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from '../ui/scroll-area'

interface Course {
  name: string
  percentage?: number
  isNew?: boolean
}

interface Category {
  name: string
  courses: Course[]
}

interface Section {
  title: string
  categories: Category[]
}

const navigationData: Section[] = [
  {
    title: "MATH",
    categories: [
      {
        name: "Calculus",
        courses: [
          { name: "Precalculus Honors" },
          { name: "AP Calculus" },
          { name: "Calculus 3/Diff. Eq." },
        ]
      },
      {
        name: "Advanced Courses",
        courses: [
          { name: "Abstract Math/Linear Algebra" },
        ]
      },
      {
        name: "Statistics",
        courses: [
          {
            name: "AP Statistics",
          }
        ]
      },
      {
        name: "Geometry",
        courses: [
          {
            name: "Geometry",
          }
        ]
      }
    ]
  },
  {
    title: "Social Studies",
    categories: [
      {
        name: "History",
        courses: [
          {
            name: "AP Art History",
          },
          {
            name: "AP US History",
          },
          {
            name: "AP World History",
          },
          {
            name: "CP US History"
          }
        ]
      },
      {
        name: "Economics",
        courses: [
          {
            name: "AP Macroeconomics",
          },
          {
            name: "AP Microeconomics",
          }
        ]
      },
      {
        name: "Government",
        courses: [
          {
            name: "AP US Government and Politics",
          },
          {
            name: "AP Comparative Government",
          }
        ]
      }
    ]
  },
  {
    title: "SCIENCE",
    categories: [
      {
        name: "Physical Science",
        courses: [
          {
            name: "Physical Science Honors"
          },
          {
            name: "CP Physical Science"
          }
        ]
      },
      {
        name: "Biology",
        courses: [
          {
            name: "AP Biology",
          },
          {
            name: "Honors Biology"
          }
        ]
      },
      {
        name: "Physics",
        courses: [
          {
            name: "AP Physics C",
          }
        ]
      },
      {
        name: "Chemistry",
        courses: [
          {
            name: "AP Chemistry",
          },
        ]
      }
    ]
  }
]

const containerVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.3, ease: 'easeInOut' }
    }
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2, ease: 'easeInOut' }
    }
  }
}

export default function Explore() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-gray-100 flex flex-row items-center justify-center gap-2"
        aria-expanded={isOpen}
        aria-label="Toggle course navigation"
      >
        Explore
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className="fixed left-0 right-0 bg-white z-40 overflow-hidden top-[64px]"
          >
            <ScrollArea>
              <div className="relative min-h-screen h-full">
                <div className="w-full h-full p-20">
                  <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {navigationData.map((section) => (
                      <div key={section.title} className="space-y-4">
                        <h3 className="font-bold text-sm text-gray-500">{section.title}</h3>
                        {section.categories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            {category.name !== section.title && (
                              <h4 className="font-medium text-sm">{category.name}</h4>
                            )}
                            <ul className="space-y-2">
                              {category.courses.map((course) => (
                                <motion.li
                                  key={course.name}
                                  whileHover={{ scale: 1.003 }}
                                >
                                  <a
                                    href="#"
                                    className="group flex items-center text-sm text-gray-700 hover:text-blue-600"
                                  >
                                    <span className="flex-1">{course.name}</span>
                                    <div className="flex items-center gap-2">
                                      {course.isNew && (
                                        <Badge variant="new">NEW</Badge>
                                      )}
                                    </div>
                                  </a>
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
  )
}

