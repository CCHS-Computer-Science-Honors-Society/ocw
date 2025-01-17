"use client";

import { useState } from "react";

export interface IFrameProps {
  url: string;
  className?: string;
  fallback?: React.ReactNode;
}

function IFrame({ url, className, fallback }: IFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    <div className="flex h-full w-full items-center justify-center">
      {fallback ?? (
        <h1 className="text-5xl font-bold">
          Loading, if this takes too long, click the button named Open Original
          Document
        </h1>
      )}
    </div>;
  }
  return (
    <iframe
      src={url}
      loading="eager"
      onLoad={() => setIsLoading(false)}
      className={className}
    />
  );
}

export default IFrame;
