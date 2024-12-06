import React from "react";

export function GetIcon(props: {
  type: "quizlet" | "tiptap" | "google_docs" | "notion";
}) {
  switch (props.type) {
    case "quizlet":
      return <FlashcardsIcon />;
    case "tiptap":
      return <TextIcon />;
    case "google_docs":
      return <TextIcon />;
    case "notion":
      return <TextIcon />;
  }
}

function TextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}

const FlashcardsIcon = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24px"
    height="24px"
    {...props}
  >
    <rect x="3" y="4" width="18" height="14" rx="2" ry="2" fill="#e0e0e0" />
    <rect x="5" y="6" width="14" height="10" rx="1" ry="1" fill="white" />
    <path d="M6 8h6v1H6V8z" fill="#757575" />
    <path d="M6 10h8v1H6v-1z" fill="#757575" />
    <path d="M6 12h5v1H6v-1z" fill="#757575" />
    <rect x="3" y="18" width="18" height="2" rx="1" ry="1" fill="#cfcfcf" />
  </svg>
);
