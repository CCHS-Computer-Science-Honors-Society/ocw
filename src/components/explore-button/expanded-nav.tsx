import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Category {
  name: string
  subjects: Subject[]
}

interface Subject {
  name: string
  courses: string[]
}

const categories: Category[] = [
  {
    name: "Technology",
    subjects: [
      {
        name: "Programming",
        courses: ["JavaScript", "Python", "Java", "C++", "Ruby"]
      },
      {
        name: "Web Development",
        courses: ["HTML/CSS", "React", "Angular", "Vue.js", "Node.js"]
      },
      {
        name: "Data Science",
        courses: ["Machine Learning", "Data Analysis", "Big Data", "R Programming"]
      }
    ]
  },
  {
    name: "Business",
    subjects: [
      {
        name: "Marketing",
        courses: ["Digital Marketing", "Content Marketing", "SEO", "Social Media Marketing"]
      },
      {
        name: "Finance",
        courses: ["Accounting", "Investment", "Financial Planning", "Cryptocurrency"]
      },
      {
        name: "Entrepreneurship",
        courses: ["Startup Fundamentals", "Business Strategy", "Venture Capital", "E-commerce"]
      }
    ]
  },
  {
    name: "Arts & Design",
    subjects: [
      {
        name: "Graphic Design",
        courses: ["Adobe Photoshop", "Illustrator", "InDesign", "UI/UX Design"]
      },
      {
        name: "Fine Arts",
        courses: ["Painting", "Sculpture", "Drawing", "Art History"]
      },
      {
        name: "Photography",
        courses: ["Digital Photography", "Portrait Photography", "Landscape Photography"]
      }
    ]
  }
]

interface ExpandedNavProps {
  isOpen: boolean
}

export default function ExpandedNav({ isOpen }: ExpandedNavProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name)

  if (!isOpen) return null

  return (
    <div className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue={categories[0]?.name} onValueChange={setSelectedCategory}>
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    <ScrollArea className="h-48">
                      <ul className="space-y-1">
                        {subject.courses.map((course) => (
                          <li key={course}>
                            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                              {course}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

