import React from "react";

export function GetIcon(props: {
  type: "quizlet" | "flashcard" | "tiptap" | "google_docs" | "notion";
}) {
  switch (props.type) {
    case "quizlet":
      return <QuizletIcon />;
    case "tiptap":
      return <TextIcon />;
    case "google_docs":
      return <GoogleDocsIcon />;
    case "flashcard":
      return <FlashcardsIcon />;
    case "notion":
      return <TextIcon />;
  }
}

function QuizletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <path
        fill="#1565c0"
        d={"M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4 V10z"}
      ></path>
      <path
        fill="#fff"
        d={"M37,36l-3.664-4.478C34.999,29.462,36,26.847,36,24c0-6.617-5.383-12-12-12s-12,5.383-12,12	s5.383,12,12,12c2.095,0,4.065-0.543,5.781-1.49L31,36H37z M24,31c-3.86,0-7-3.141-7-7s3.14-7,7-7s7,3.141,7,7	c0,1.278-0.35,2.473-0.95,3.505L28,25h-6l4.519,5.523C25.736,30.827,24.889,31,24,31z"}
      ></path>
    </svg>
  );
}

function GoogleDocsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 100 100"
    >
      <path
        fill="#1565c0"
        d={"M59.5,12H27c-2.761,0-5,2.239-5,5v66c0,2.761,2.239,5,5,5h46c2.761,0,5-2.239,5-5V30.5L59.5,12z"}
      ></path>
      <path
        fill="#9dc4e8"
        d={"M59.5,11.5V25c0,3.038,2.462,5.5,5.5,5.5h13.5L59.5,11.5z"}
      ></path>
      <rect width="33" height="4" x="33.5" y="46.5" fill="#fefdef"></rect>
      <rect width="33" height="4" x="33.5" y="54.5" fill="#fefdef"></rect>
      <rect width="24" height="4" x="33.5" y="70.5" fill="#fefdef"></rect>
      <rect width="33" height="4" x="33.5" y="62.5" fill="#fefdef"></rect>
      <g>
        <path
          fill="#1f212b"
          d={"M66.5,51h-33c-0.276,0-0.5-0.224-0.5-0.5v-4c0-0.276,0.224-0.5,0.5-0.5h33 c0.276,0,0.5,0.224,0.5,0.5v4C67,50.776,66.776,51,66.5,51z M34,50h32v-3H34V50z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M66.5,59h-33c-0.276,0-0.5-0.224-0.5-0.5v-4c0-0.276,0.224-0.5,0.5-0.5h33 c0.276,0,0.5,0.224,0.5,0.5v4C67,58.776,66.776,59,66.5,59z M34,58h32v-3H34V58z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M57.5,75h-24c-0.276,0-0.5-0.224-0.5-0.5v-4c0-0.276,0.224-0.5,0.5-0.5h24 c0.276,0,0.5,0.224,0.5,0.5v4C58,74.776,57.776,75,57.5,75z M34,74h23v-3H34V74z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M66.5,67h-33c-0.276,0-0.5-0.224-0.5-0.5v-4c0-0.276,0.224-0.5,0.5-0.5h33 c0.276,0,0.5,0.224,0.5,0.5v4C67,66.776,66.776,67,66.5,67z M34,66h32v-3H34V66z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M73,89H27c-3.309,0-6-2.691-6-6V17c0-3.309,2.691-6,6-6h32.5c0.266,0,0.52,0.105,0.707,0.293 l18.5,18.5C78.895,29.98,79,30.234,79,30.5V83C79,86.309,76.309,89,73,89z M27,13c-2.206,0-4,1.794-4,4v66c0,2.206,1.794,4,4,4h46 c2.206,0,4-1.794,4-4V30.914L59.086,13H27z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M73.5,73c-0.276,0-0.5-0.224-0.5-0.5v-32c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v32 C74,72.776,73.776,73,73.5,73z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M71.5,84h-11c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h11c0.827,0,1.5-0.673,1.5-1.5v-6 c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v6C74,82.879,72.879,84,71.5,84z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M57.5,84h-5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h5c0.276,0,0.5,0.224,0.5,0.5 S57.776,84,57.5,84z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M77.5,31H65c-3.309,0-6-2.691-6-6V12.5c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V25 c0,2.757,2.243,5,5,5h12.5c0.276,0,0.5,0.224,0.5,0.5S77.776,31,77.5,31z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M26.5,41c-0.276,0-0.5-0.224-0.5-0.5v-22c0-1.379,1.122-2.5,2.5-2.5h15c0.276,0,0.5,0.224,0.5,0.5 S43.776,17,43.5,17h-15c-0.827,0-1.5,0.673-1.5,1.5v22C27,40.776,26.776,41,26.5,41z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M26.5,55c-0.276,0-0.5-0.224-0.5-0.5v-11c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v11 C27,54.776,26.776,55,26.5,55z"}
        ></path>
        <path
          fill="#1f212b"
          d={"M26.5,61c-0.276,0-0.5-0.224-0.5-0.5v-3c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v3 C27,60.776,26.776,61,26.5,61z"}
        ></path>
      </g>
    </svg>
  );
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
      <path d={"M17 6.1H3"} />
      <path d={"M21 12.1H3"} />
      <path d={"M15.1 18H3"} />
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
    <path d={"M6 8h6v1H6V8z"} fill="#757575" />
    <path d={"M6 10h8v1H6v-1z"} fill="#757575" />
    <path d={"M6 12h5v1H6v-1z"} fill="#757575" />
    <rect x="3" y="18" width="18" height="2" rx="1" ry="1" fill="#cfcfcf" />
  </svg>
);
