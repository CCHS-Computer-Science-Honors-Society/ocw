import ContributorCard from "./_components/contributorCard";

const contributors = [
  {
    id: 1,
    name: "Aniketh Chenjeri",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Aniketh is the President of the Computer Science Honor Society and lead developer of our platform",
  },
  {
    id: 2,
    name: "Jason Chen",
    avatar: "/headshots/jason.png",
    description:
      "Jason is the Co-Founder of the old OpenCourseWare site and is helping develop this platform.",
  },
  {
    id: 3,
    name: "Matthew Anderson",
    avatar: "/headshots/default_headshot.jpg",
    description: "Matthew was is the Co-Founder of the old OpenCourseWare site",
  },
  {
    id: 5,
    name: "Rodrigo Salgado Vallarino",
    avatar: "/headshots/rodrigo.jpeg",
    description:
      "Rodrigo is a contributor to many courses on the platform and maintained the content on OpenCourseWare for the 2023-2024 school year",
  },
  {
    id: 4,
    name: "Jonathan Varghese",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Jonathan is a contributor to many of the courses on the platform, including the AP US Government and Politics course",
  },
  {
    id: 6,
    name: "Aimee Resnick",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Aimee is a contributor to many of the courses on the platform, including the AP Biology course",
  },
  {
    id: 7,
    name: " Josh Guthrie",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Josh is a contributor to many of the courses on the platform, including the AP Environmental Science course",
  },
  {
    id: 8,
    name: "Anna Liu",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Anna is a contributor to many of the courses on the platform, including the AP Statistics course",
  },
  {
    id: 9,
    name: "Cooper Shine",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Cooper is the co-maintainer of the Mathamatics section of the platform",
  },
  {
    id: 10,
    name: "Krit Krishna",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Krit is the co-maintainer of the Mathamatics section of the platform",
  },
  {
    id: 11,
    name: "Andrew Doyle",
    avatar: "/headshots/default_headshot.jpg",
    description:
      "Andrew is theco-maintainer of the Mathamatics & Chemistry section of the platform",
  },
  {
    id: 12,
    name: "Rohith Thomas",
    avatar: "/headshots/default_headshot.jpg",
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
