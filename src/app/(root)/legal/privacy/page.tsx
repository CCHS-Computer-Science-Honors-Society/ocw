import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Privacy Policy
        </h1>
        <div className="mb-12 flex justify-center">
          <Image
            src="/undraw_private_data_re_4eab-wI0Zz8cV8yvwCaktT1CxJUIy4QFKSU.svg"
            alt="Privacy Illustration"
            width={400}
            height={300}
            priority
          />
        </div>
        <div className="space-y-6 text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900">
            Privacy Policy
          </h2>
          <p className="leading-relaxed">
            At OCW, we are fully committed to transparency and user privacy. Our
            platform is 100% open-source, meaning you can review the code at any
            time to understand exactly how your data is handled. We do not
            collect any unnecessary data—only what is essential for the
            functionality and performance of our application.
          </p>
          <p className="leading-relaxed">
            If you have questions about how we use your data, we encourage you
            to explore our open-source repository or contact us directly.
          </p>
        </div>
        <div className="mt-12 flex justify-center space-x-4 border-t border-gray-200 pt-8">
          <a
            href="/github"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Source Code
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/contact"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
