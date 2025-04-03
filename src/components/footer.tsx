import Link from "next/link";

export default function FooterSections() {
  const footerData = [
    {
      title: "About Us",
      content:
        "OpenCourseWare is dedicated to providing free, high-quality education to learners worldwide.",
    },
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "/" },
        { text: "Courses", href: "/courses" },
        { text: "About", href: "/about" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Service", href: "/legal/tos" },
        { text: "Privacy Policy", href: "/legal/privacy" },
        { text: "Cookie Policy", href: "/legal/cookie" },
      ],
    },
    {
      title: "Connect With Us",
      links: [
        // Replace with your actual social media profile URLs
        { text: "Instagram", href: "https://www.instagram.com/creekcshs/" },
      ],
    },
  ];

  return (
    <>
      {footerData.map((section, index) => (
        <div key={index}>
          <h5 className="mb-4 text-lg font-semibold">{section.title}</h5>
          {section.content && (
            <p className="text-sm text-muted-foreground">{section.content}</p>
          )}
          {section.links && (
            <nav className="space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.text} // Use link.text as key
                  href={link.href} // Use link.href for the URL
                  prefetch
                  className="block text-sm text-muted-foreground hover:text-primary"
                  // Add target="_blank" and rel="noopener noreferrer" for external links
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.text} {/* Display link.text */}
                </Link>
              ))}
            </nav>
          )}
        </div>
      ))}
    </>
  );
}
