import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  FileEdit,
  Paintbrush,
  Code,
  Clock,
  HelpCircle,
} from "lucide-react";
import QRCode from "./_components/qr";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contribute to OCW | Join Our Open Education Community",
  description:
    "Share your expertise, design skills, or development knowledge to help build our open courseware platform. Join our community and make education more accessible.",
  keywords:
    "open courseware, OCW, contribute, education, volunteer, community service, open source education, teaching, learning, development, design, writing",
  openGraph: {
    title: "Contribute to OCW | Join Our Open Education Community",
    description:
      "Share your expertise, design skills, or development knowledge to help build our open courseware platform. Join our community and make education more accessible.",
    url: "https://ocw.example.org/contribute",
    siteName: "Open Courseware Project",
    images: [
      {
        url: "/images/contribute-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open Courseware Project - Contribute page showing various ways to get involved",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contribute to OCW | Join Our Open Education Community",
    description:
      "Share your expertise, design skills, or development knowledge to help build our open courseware platform.",
    images: [
      {
        url: "/images/contribute-og-image.jpg",
        alt: "Open Courseware Project - Contribute page showing various ways to get involved",
      },
    ],
    creator: "@ocw_project",
    site: "@ocw_project",
  },
  alternates: {
    canonical: "https://ocw.example.org/contribute",
  },
  authors: [{ name: "OCW Team" }],
  category: "Education",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContributePage() {
  // Example form URLs - replace with actual Google Form URLs
  const forms = [
    {
      id: "write",
      title: "Write for OCW",
      description:
        "Share your knowledge and expertise by contributing written content to our open courseware platform.",
      url: "https://forms.gle/ALUL2GEsCRv7eifp9",
      icon: <FileEdit className="text-primary h-8 w-8" />,
    },
    {
      id: "design",
      title: "Design for OCW",
      description:
        "Help improve the visual experience of our platform with your design skills and creative ideas.",
      url: "https://forms.gle/iFUVRvHtKehxVZah7",
      icon: <Paintbrush className="text-primary h-8 w-8" />,
    },
    {
      id: "develop",
      title: "Develop the Platform",
      description:
        "Contribute to the technical development of our platform with your coding and development expertise.",
      url: "https://forms.gle/g4PBXz5LE3GBYYhT6",
      icon: <Code className="text-primary h-8 w-8" />,
    },
  ];

  const meetingTimes = [
    {
      id: "wednesday",
      day: "Wednesday",
      time: "After School",
      hours: "3:30 PM - 4:15 PM",
      icon: <Clock className="text-primary h-8 w-8" />,
    },
    {
      id: "thursday",
      day: "Thursday",
      time: "Before School",
      hours: "7:50 AM - 8:10 AM",
      icon: <Clock className="text-primary h-8 w-8" />,
    },
  ];

  const faqs = [
    {
      question: "How long will it take to hear back?",
      answer: "We look over the forms every Sunday.",
    },
    {
      question: "Does what I do count as community service hours?",
      answer: "Yes.",
    },
    {
      question:
        "What if I want to contribute to a course that already has content on the website?",
      answer:
        "That's fine, we probably have something for you to do so include it when you fill the form out.",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Contribute to the Project
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Join our community and help us improve the open courseware platform.
            There are several ways you can contribute.
          </p>
        </div>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">Contribution Forms</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {forms.map((form) => (
              <Card key={form.id} className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {form.icon}
                    <CardTitle>{form.title}</CardTitle>
                  </div>
                  <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <div className="flex justify-center">
                    <Suspense
                      fallback={<Skeleton className="h-12 w-12"></Skeleton>}
                    >
                      <QRCode value={form.url} size={180} />
                    </Suspense>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <a
                      href={form.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Form
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">Meeting Times</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {meetingTimes.map((meeting) => (
              <Card key={meeting.id} className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {meeting.icon}
                    <CardTitle>{meeting.day}</CardTitle>
                  </div>
                  <CardDescription>{meeting.time}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-xl font-semibold">
                      {meeting.hours}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Github className="text-primary h-8 w-8" />
                <CardTitle>GitHub Repository</CardTitle>
              </div>
              <CardDescription>
                Contribute directly to our codebase by submitting pull requests,
                reporting issues, or reviewing code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our project is open source and we welcome contributions from
                developers of all skill levels. Whether you&apos;re fixing a
                bug, adding a feature, or improving documentation, your help is
                valuable.
              </p>
              <p className="mb-4">
                Before contributing, please read our contribution guidelines to
                understand our workflow and coding standards.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="https://github.com/CCHS-Computer-Science-Honors-Society/ocw.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Visit GitHub Repository
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="text-primary h-8 w-8" />
                <CardTitle>FAQ</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold">Why Contribute?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Make an Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your contributions help make education more accessible to
                  people around the world. By sharing your knowledge and skills,
                  you&apos;re helping to create a valuable resource for learners
                  everywhere.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Join Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Become part of a passionate community of educators, designers,
                  and developers working together to improve open education.
                  Connect with like-minded individuals and expand your
                  professional network.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
export const experimental_ppr = true;
