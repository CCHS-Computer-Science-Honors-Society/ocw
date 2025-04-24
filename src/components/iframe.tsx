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
/*
 * TODO: we have  error managment but if any errors are present it stops the embed from rendering entirely and displays the error message.
 * we need to find a way to only stop the embed when there are breaking errors and not just when there are errors.
 */

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

  const handleError = () => {
    clearTimeout(timeoutRef.current);
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError(new Error("Failed to load embed"));
    }
  };

  return (
    <div className={className}>
      {isLoading && !hasError ? (
        <div className="loader" role="alert" aria-live="assertive">
          {loaderComponent ?? (
            <div className="border-muted flex h-[87vh] w-full flex-col items-center justify-center rounded-xl shadow-2xl">
              <LoaderCircleIcon className="animate-spin" />
              <div className="text-center">
                Loading...
                <ul className="mt-2 text-sm text-gray-600">
                  <li>If this takes a long time, try turning off your VPN</li>
                  <li>Click the Open in new Tab button</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : null}

      <iframe
        ref={iframeRef}
        src={embedUrl}
        onLoad={handleLoad}
        onError={handleError}
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
