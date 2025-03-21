import ContributorCard from "./_components/contributorCard";

const defaultPhoto =
  "https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcf1bAHpXv5c4nkOatgwsmYj96KRpli3hUEdx1";

const contributors = [
  {
    id: 1,
    name: "Aniketh Chenjeri",
    avatar: defaultPhoto,
    description:
      "Aniketh is the President of the Computer Science Honor Society and lead developer of our platform",
  },
  {
    id: 2,
    name: "Jason Chen",
    avatar:
      "https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcBOk5v5CzYZbKVLiWvQ9r1lpMUyjw58osCXnO",
    description:
      "Jason is the Co-Founder of the original OpenCourseWare site and is helping develop this platform",
  },
  {
    id: 3,
    name: "Matthew Anderson",
    avatar: defaultPhoto,
    description: "Matthew was is the Co-Founder of the old OpenCourseWare site",
  },
  {
    id: 4,
    name: "Jonathan Varghese",
    avatar: defaultPhoto,
    description:
      "Jonathan is a contributor to many of the courses on the platform, including the AP US Government and Politics course",
  },

  {
    id: 5,
    name: "Rodrigo Salgado Vallarino",
    avatar:
      "https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcbTcMMoLZTl6LHeR2dnPrGuZSo1VBEa3gxciU",
    description:
      "Rodrigo is a contributor to many courses on the platform and maintained the content on OpenCourseWare for the 2023-2024 school year",
  },
  {
    id: 6,
    name: "Aimee Resnick",
    avatar: defaultPhoto,
    description:
      "Aimee is a contributor to many of the courses on the platform, including the AP Biology course",
  },
  {
    id: 7,
    name: " Josh Guthrie",
    avatar: defaultPhoto,
    description:
      "Josh is a contributor to many of the courses on the platform, including the AP Environmental Science course",
  },
  {
    id: 8,
    name: "Anna Liu",
    avatar: defaultPhoto,
    description:
      "Anna is a contributor to many of the courses on the platform, including the AP Statistics course",
  },
  {
    id: 9,
    name: "Cooper Shine",
    avatar: defaultPhoto,
    description:
      "Cooper is the co-maintainer of the Mathematics section of the platform",
  },
  {
    id: 10,
    name: "Krit Krishna",
    avatar: defaultPhoto,
    description:
      "Krit is the co-maintainer of the Mathematics section of the platform",
  },
  {
    id: 11,
    name: "Andrew Doyle",
    avatar: defaultPhoto,
    description:
      "Andrew is theco-maintainer of the Mathematics & Chemistry section of the platform",
  },
  {
    id: 12,
    name: "Rohith Thomas",
    avatar: defaultPhoto,
    description:
      "Rohith is a mathematical specialist and contributor to physical and high level mathematics courses on the platform",
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
