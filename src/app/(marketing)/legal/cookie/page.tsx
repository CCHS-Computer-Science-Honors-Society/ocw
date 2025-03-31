import Image from "next/image";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Cookie Policy
        </h1>
        <div className="mb-12 flex justify-center">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Cookie Policy Illustration"
            width={400}
            height={300}
            priority
          />
        </div>
        <div className="space-y-6 text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900">
            Cookie Policy Verbiage
          </h2>
          <p className="leading-relaxed">
            We use cookies solely to ensure the proper functionality of our
            platform. No unnecessary cookies are stored, and we do not track
            users for advertising or marketing purposes.
          </p>
          <p className="leading-relaxed">
            As a 100% open-source platform, you can review our code to see
            exactly how cookies are implemented and what data they process. By
            using our application, you agree to the minimal and essential use of
            cookies required for its operation.
          </p>
        </div>
        <div className="mt-12 flex justify-center space-x-4 border-t border-gray-200 pt-8">
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Source Code
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
