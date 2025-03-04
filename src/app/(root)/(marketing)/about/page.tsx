import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          About Us
        </h1>
        <div className="space-y-6 text-gray-600">
          <p className="leading-relaxed">
            OpenCourseWare (OCW) is dedicated to providing free, high-quality
            education to learners worldwide. Our platform offers a wide range of
            courses, resources, and tools to help students achieve their
            academic goals.
          </p>
          <p className="leading-relaxed">
            Our mission is to make education accessible to everyone, regardless
            of their background or location. We believe that knowledge should be
            freely available to all, and we strive to create a community of
            learners who can share and grow together.
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
