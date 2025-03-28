"use client";
import { LoaderCircleIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface EmbedLoaderProps {
  src: string;
  loaderComponent?: React.ReactNode;
  timeout?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds

export const Embed: React.FC<EmbedLoaderProps> = ({
  src: embedUrl,
  loaderComponent,
  timeout = DEFAULT_TIMEOUT,
  onLoad,
  onError,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Set a timeout to trigger error if embed takes too long to load.
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
        if (onError) {
          onError(new Error("Embed load timed out"));
        }
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [timeout, isLoading, onError]);

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = (e) => {
    clearTimeout(timeoutRef.current);
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError(new Error("Failed to load embed"));
    }
  };

  return (
    <div className={className}>
      {isLoading && !hasError && (
        <div className="loader" role="alert" aria-live="assertive">
          {loaderComponent ?? (
            <div className="flex h-[87vh] w-full flex-col items-center justify-center rounded-xl border-muted shadow-2xl">
              <LoaderCircleIcon className="animate-spin" />
              Loading... If this takes a long time, try turning off your vpn or
              clicking the Open in new Tab button.
            </div>
          )}
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={embedUrl}
        onLoad={handleLoad}
        onError={(e) => handleError(e)}
        style={{
          display: isLoading ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
        title="Embedded Content"
        loading="eager"
      />
    </div>
  );
};
