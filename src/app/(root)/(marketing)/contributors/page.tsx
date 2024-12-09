import ContributorCard from "./_components/contributors";

const contributors = [
  {
    id: 1,
    name: "Aniketh Chenjeri",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Aniketh is the President of the Computer Science Honor Society and lead developer of our platform",
  },
  {
    id: 2,
    name: "Jason Chen",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQGKZLnVNMeoUw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730318456478?e=1738800000&v=beta&t=QF7cfQv2CSSiz-RGlFED5oQ0WlWOGkwoIzRi8qUi6CY",
    description:
      "Jason was is the Co-Founder of the old OpenCourseWare wordpress platform",
  },
  {
    id: 3,
    name: "Matthew Anderson",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Matthew  was is the Co-Founder of the old OpenCourseWare wordpress platform",
  },
  {
    id: 5,
    name: "Rodrigo Salgado Vallarino",
    avatar:
      "https://utfs.io/f/SnzXVuggV8iuGD9xBpNSrPKiAdRxgNz7pYVf5nb6C9aUkHtq",
    description:
      "Rodrigo is a contributor to many courses on the platform and maintained the content on OpenCourseWare for the 2023-2024 school year",
  },
  {
    id: 4,
    name: "Jonathan Varghese",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Jonathan is a contributor to many of the courses on the platform, including the AP US Government and Politics course",
  },
  {
    id: 6,
    name: "Aimee Resnick",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Aimee is a contributor to many of the courses on the platform, including the AP Biology course",
  },
  {
    id: 7,
    name: " Josh Guthrie",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Josh is a contributor to many of the courses on the platform, including the AP Environmental Science course",
  },
  {
    id: 8,
    name: "Anna Liu",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Anna is a contributor to many of the courses on the platform, including the AP Statistics course",
  },
  {
    id: 9,
    name: "Cooper Shine",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Cooper is the co-maintainer of the Mathamatics section of the platform",
  },
  {
    id: 10,
    name: "Krit Krishna",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Krit is the co-maintainer of the Mathamatics section of the platform",
  },
  {
    id: 11,
    name: "Andrew Doyle",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Andrew is theco-maintainer of the Mathamatics & Chemistry section of the platform",
  },
  {
    id: 12,
    name: "Rohith Thomas",
    avatar: "/placeholder.svg?height=80&width=80",
    description:
      "Rohith is a mathamatical specialist and contributor to physical and high level mathamatics courses on the platform",
  },
];

export default function ContributorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Our Contributors</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contributors.map((contributor) => (
          <ContributorCard key={contributor.id} {...contributor} />
        ))}
      </div>
    </div>
  );
}
