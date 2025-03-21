import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Contact Us
        </h1>
        <div className="space-y-6 text-gray-600">
          <p className="leading-relaxed">
            If you have any questions or would like to get in touch with us,
            please feel free to contact our team members below.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <img
              src="https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcf1bAHpXv5c4nkOatgwsmYj96KRpli3hUEdx1"
              alt="Aniketh Chenjeri"
              className="mb-4 h-20 rounded-full"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Aniketh Chenjeri
            </h2>
            <p className="text-center text-gray-600">
              Aniketh is the President of the Computer Science Honor Society and
              lead developer of the platform.
            </p>
            <a
              href="mailto:anikethchenjeri@gmail.com"
              className="mt-4 text-blue-600 hover:text-blue-800 hover:underline"
            >
              anikethchenjeri@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcBOk5v5CzYZbKVLiWvQ9r1lpMUyjw58osCXnO"
              alt="Jason Chen"
              className="full full 0 mb-4 h-20 rounded-full"
            />
            <h2 className="text-xl font-semibold text-gray-900">Jason Chen</h2>
            <p className="text-center text-gray-600">
              Jason is the Co-Founder of the original OpenCourseWare site and is
              helping develop this platform.
            </p>
            <a
              href="mailto:jchen3200@gatech.edu"
              className="mt-4 text-blue-600 hover:text-blue-800 hover:underline"
            >
              jchen3200@gatech.edu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
