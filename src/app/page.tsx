import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="animate-float relative mx-auto mb-12 w-full max-w-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/undraw_under_construction_-46-pa%20(1)-O48JHKdqH0CZePwsA4AzkeWetVYco7.svg"
            alt="Under Construction Illustration"
            className="h-auto w-full"
          />
        </div>
        <h1 className="animate-fade-in mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Under Construction
        </h1>
        <p className="animate-fade-in-delay mb-8 text-lg text-gray-600 md:text-xl">
          We're building something amazing. Check back soon!
        </p>
        <div className="mb-8 animate-pulse">
          <div className="mx-auto h-1 w-16 rounded-full bg-red-500"></div>
        </div>
        <nav className="animate-fade-in" aria-label="Contribution options">
          <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            {[
              {
                href: "https://forms.gle/fnj7jfZAZCtwzAyD8",
                text: "Want to Contribute",
              },
              {
                href: "https://forms.gle/BhgdRNW7sF8p1vDv6",
                text: "Want to help write content",
              },
              {
                href: "https://forms.gle/Yxs4EqDQ3Sr5ZSbB7",
                text: "Want to help design",
              },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:text-primary-600 focus:ring-primary-500 text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
