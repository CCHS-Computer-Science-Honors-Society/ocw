import React from "react";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-foreground mb-8 text-center text-3xl font-bold tracking-tight">
          About Us
        </h1>
        <div className="text-foreground space-y-6">
          <p className="leading-relaxed">
            Creek OpenCourseWare (OCW) is dedicated to providing free,
            high-quality resources to students at Cherry Creek High School. Our
            platform offers a wide range of courses, notes, and tools to help
            students achieve their academic goals.
          </p>
          <p className="leading-relaxed">
            As students who are always invested in helping others learn—often
            from resources we created ourselves—CreekOCW is our way of
            facilitating a larger proliferation of the best of these resources.
            In general and at Creek, sharing knowledge heightens the character
            of our academics, accelerates the pace of our learning, and deepens
            the level of our understanding.
          </p>
          <br />
          <h1 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Our Mission
          </h1>
          <p className="leading-relaxed">
            We believe that by enhancing student learning, OCW will help reduce
            the temptation to cheat, plagiarize, and cut corners. Our goal is to
            provide students with the resources they need to succeed
            academically and to alleviate academic stress.
          </p>
          <p className="leading-relaxed">
            If you have any questions or would like to learn more about our
            platform, please feel free to{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
