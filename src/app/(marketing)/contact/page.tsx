import Image from "next/image";

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
            please feel free to contact our team members below or the
            organization maintaining this site.
          </p>
        </div>

        {/* Organization Contact Section */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Maintained By
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            This OpenCourseWare site is proudly maintained by the Cherry Creek
            High School&apos;s Computer Science Honor Society. For general
            inquiries about the site&apos;s maintenance or the organization,
            please contact:
          </p>
          <a
            href="mailto:cherrycreekcshs@gmail.com" // <-- REPLACE WITH ACTUAL EMAIL
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 hover:underline"
          >
            cherrycreekcshs@gmail.com
          </a>
        </div>

        {/* Individual Contacts Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Aniketh Chenjeri */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcf1bAHpXv5c4nkOatgwsmYj96KRpli3hUEdx1"
              alt="Aniketh Chenjeri"
              width={80} // Keep width and height consistent for aspect ratio
              height={80} // Make height same as width for circle
              className="mb-4 h-20 w-20 rounded-full object-cover" // Added w-20 and object-cover
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Aniketh Chenjeri
            </h2>
            <p className="text-gray-600">
              Aniketh serves as the Project Lead and Lead Developer. In this
              dual role, he directs the project&apos;s development and manages
              the content presented on the site.
            </p>
            <a
              href="mailto:anikethchenjeri@gmail.com"
              className="mt-4 text-blue-600 hover:text-blue-800 hover:underline"
            >
              anikethchenjeri@gmail.com
            </a>
          </div>

          {/* Jason Chen */}
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcBOk5v5CzYZbKVLiWvQ9r1lpMUyjw58osCXnO"
              alt="Jason Chen"
              width={80} // Keep width and height consistent for aspect ratio
              height={80} // Make height same as width for circle
              className="mb-4 h-20 w-20 rounded-full object-cover" // Corrected classes, added w-20 and object-cover
            />
            <h2 className="text-xl font-semibold text-gray-900">Jason Chen</h2>
            <p className="text-gray-600">
              Jason is the Co-Founder of the original OpenCourseWare platform
              and is helping develop the current site.
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
