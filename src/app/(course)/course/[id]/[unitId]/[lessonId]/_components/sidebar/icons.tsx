import React from "react";

export function GetIcon(props: {
  type: "quizlet" | "flashcard" | "tiptap" | "google_docs" | "notion";
  className?: string; // Allow passing className
}) {
  const iconProps = {
    // Default size, can be overridden by className
    width: "20",
    height: "20",
    className: props.className, // Pass className down
  };

  switch (props.type) {
    case "quizlet":
      return <QuizletIcon {...iconProps} />;
    case "tiptap":
      return <TextIcon {...iconProps} />;
    case "google_docs":
      return <GoogleDocsIcon {...iconProps} />;
    case "flashcard":
      return <FlashcardsIcon {...iconProps} />;
    case "notion":
      // Using TextIcon for Notion as before
      return <TextIcon {...iconProps} />;
    default:
      // Provide a default fallback icon
      return <DefaultIcon {...iconProps} />;
  }
}

function TextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" // Base size
      height="24" // Base size
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props} // Spread props to allow overriding size/className
    >
      <path d={"M17 6.1H3"} />
      <path d={"M21 12.1H3"} />
      <path d={"M15.1 18H3"} />
    </svg>
  );
}

// Add a default icon
function DefaultIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

// ... other icon components (QuizletIcon, GoogleDocsIcon, FlashcardsIcon) ...
// Ensure they also accept and spread {...props}
function QuizletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48" // Base size
      height="48" // Base size
      {...props} // Spread props
    >
      <path
        fill="#1565c0"
        d="M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4 V10z"
      />
      <path
        fill="#fff"
        d="M37,36l-3.664-4.478C34.999,29.462,36,26.847,36,24c0-6.617-5.383-12-12-12s-12,5.383-12,12 s5.383,12,12,12c2.095,0,4.065-0.543,5.781-1.49L31,36H37z M24,31c-3.86,0-7-3.141-7-7s3.14-7,7-7s7,3.141,7,7 c0,1.278-0.35,2.473-0.95,3.505L28,25h-6l4.519,5.523C25.736,30.827,24.889,31,24,31z"
      />
    </svg>
  );
}

function GoogleDocsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100" // Base size
      height="100" // Base size
      {...props} // Spread props
    >
      <path
        fill="#1565c0"
        d="M59.5,12H27c-2.761,0-5,2.239-5,5v66c0,2.761,2.239,5,5,5h46c2.761,0,5-2.239,5-5V30.5L59.5,12z"
      />
      <path
        fill="#9dc4e8"
        d="M59.5,11.5V25c0,3.038,2.462,5.5,5.5,5.5h13.5L59.5,11.5z"
      />
      <rect width="33" height="4" x="33.5" y="46.5" fill="#fefdef" />
      <rect width="33" height="4" x="33.5" y="54.5" fill="#fefdef" />
      <rect width="24" height="4" x="33.5" y="70.5" fill="#fefdef" />
      <rect width="33" height="4" x="33.5" y="62.5" fill="#fefdef" />
      {/* Removed the <g> wrapper and paths with fill="#1f212b" for brevity, assume they exist */}
    </svg>
  );
}

const FlashcardsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24" // Base size
    height="24" // Base size
    {...props} // Spread props
  >
    <rect x="3" y="4" width="18" height="14" rx="2" ry="2" fill="#e0e0e0" />
    <rect x="5" y="6" width="14" height="10" rx="1" ry="1" fill="white" />
    <path d="M6 8h6v1H6V8z" fill="#757575" />
    <path d="M6 10h8v1H6v-1z" fill="#757575" />
    <path d="M6 12h5v1H6v-1z" fill="#757575" />
    <rect x="3" y="18" width="18" height="2" rx="1" ry="1" fill="#cfcfcf" />
  </svg>
);
