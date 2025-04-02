import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, FileEdit, Paintbrush, Code } from "lucide-react";
import QRCode from "./_components/qr";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute To OCW",
};

export default function ContributePage() {
  // Example form URLs - replace with actual Google Form URLs
  const forms = [
    {
      id: "write",
      title: "Write for OCW",
      description:
        "Share your knowledge and expertise by contributing written content to our open courseware platform.",
      url: "https://forms.google.com/write-for-ocw",
      icon: <FileEdit className="h-8 w-8 text-primary" />,
    },
    {
      id: "design",
      title: "Design for OCW",
      description:
        "Help improve the visual experience of our platform with your design skills and creative ideas.",
      url: "https://forms.google.com/design-for-ocw",
      icon: <Paintbrush className="h-8 w-8 text-primary" />,
    },
    {
      id: "develop",
      title: "Develop the Platform",
      description:
        "Contribute to the technical development of our platform with your coding and development expertise.",
      url: "https://forms.google.com/develop-the-platform",
      icon: <Code className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Contribute to the Project
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
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
                <CardContent className="flex-grow">
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Github className="h-8 w-8 text-primary" />
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
                <a
                  href="https://github.com/CCHS-Computer-Science-Honors-Society/ocw.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Visit GitHub Repository
                </a>
              </Button>
            </CardFooter>
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
