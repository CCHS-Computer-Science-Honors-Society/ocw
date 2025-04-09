/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { type HTMLAttributes } from "react";

interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  if (inline) {
    // Render inline code
    return (
      <code
        {...props}
        className={`rounded-md bg-zinc-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800 ${
          className ?? ""
        }`}
      >
        {children}
      </code>
    );
  }

  // Render code content for fenced code blocks.
  // ReactMarkdown will wrap this in a <pre> tag via the custom 'pre' component.
  return (
    <code
      {...props}
      // Add language class for syntax highlighting, if available
      className={`break-words whitespace-pre-wrap ${className ?? ""}`}
    >
      {children}
    </code>
  );
}
