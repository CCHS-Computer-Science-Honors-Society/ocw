import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Partial<Components> = {
  // Custom 'pre' component to style the wrapper for fenced code blocks
  pre: ({ node, children, ...props }) => {
    // Apply styling to the <pre> element
    return (
      <pre
        {...props}
        className="not-prose my-4 w-full overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      >
        {children} {/* This will render the <code> element from CodeBlock */}
      </pre>
    );
  },

  // --- Other components (including table styling) ---
  ol: ({ node, children, ...props }) => {
    return (
      <ol className="ml-4 list-outside list-decimal" {...props}>
        {children}
      </ol>
    );
  },
  li: ({ node, children, ...props }) => {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ node, children, ...props }) => {
    // Use list-disc for unordered lists
    return (
      <ul className="ml-4 list-outside list-disc" {...props}>
        {children}
      </ul>
    );
  },
  strong: ({ node, children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ node, children, ...props }) => {
    const href = props.href ?? "#";
    return (
      <Link
        href={href}
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ node, children, ...props }) => {
    return (
      <h1 className="mt-6 mb-2 text-3xl font-semibold" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ node, children, ...props }) => {
    return (
      <h2 className="mt-6 mb-2 text-2xl font-semibold" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ node, children, ...props }) => {
    return (
      <h3 className="mt-6 mb-2 text-xl font-semibold" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ node, children, ...props }) => {
    return (
      <h4 className="mt-6 mb-2 text-lg font-semibold" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ node, children, ...props }) => {
    return (
      <h5 className="mt-6 mb-2 text-base font-semibold" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ node, children, ...props }) => {
    return (
      <h6 className="mt-6 mb-2 text-sm font-semibold" {...props}>
        {children}
      </h6>
    );
  },
  // Basic table styling
  table: ({ node, children, ...props }) => (
    <div className="overflow-x-auto">
      <table
        className="my-4 w-full border-collapse border border-zinc-300 dark:border-zinc-700"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ node, children, ...props }) => (
    <thead className="bg-zinc-100 dark:bg-zinc-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ node, children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ node, children, ...props }) => (
    <tr className="border-b border-zinc-300 dark:border-zinc-700" {...props}>
      {children}
    </tr>
  ),
  th: ({ node, children, ...props }) => (
    <th
      className="border border-zinc-300 px-4 py-2 text-left font-semibold dark:border-zinc-700"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ node, children, ...props }) => (
    <td
      className="border border-zinc-300 px-4 py-2 dark:border-zinc-700"
      {...props}
    >
      {children}
    </td>
  ),
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  // Ensure children is a string, handle null/undefined if necessary
  const content = typeof children === "string" ? children : "";
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {content}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
