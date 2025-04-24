"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function VercelTabs({
  dataButtons,
}: {
  dataButtons: { label: string; href: string }[];
}) {
  const [elementFocused, setElementFocused] = useState<number>(0);

  const handleOnClickButton = (index: number) => {
    setElementFocused(index);
  };
  return (
    <nav className="flex flex-col sm:flex-row">
      {dataButtons.map((button, index) => (
        <Link href={`${button.href}`} key={button.label}>
          <button
            className={`relative inline-flex w-fit rounded px-2 py-1 text-sm font-medium whitespace-nowrap text-neutral-500 transition-colors hover:text-neutral-600 dark:hover:text-neutral-400`}
            onClick={() => handleOnClickButton(index)}
            type="button"
          >
            {button.label}
            <AnimatePresence>
              {elementFocused === index && (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-0 right-0 bottom-0 left-0 -z-10 rounded-md bg-neutral-200 dark:bg-neutral-800"
                  exit={{ opacity: 0, scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  layout={true}
                  layoutId="focused-element"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence>
          </button>
        </Link>
      ))}
    </nav>
  );
}
