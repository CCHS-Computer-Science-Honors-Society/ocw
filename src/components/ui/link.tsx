"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type PrefetchImage = {
  srcset: string;
  sizes: string;
  src: string;
  alt: string;
  loading: string;
};

type PrefetchEmbed = {
  src: string;
  loading: string;
  title: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prefetchImages(href: string) {
  if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
    return [];
  }
  const url = new URL(href, window.location.href);
  const imageResponse = await fetch(`/api/prefetch-images${url.pathname}`, {
    priority: "low",
  });
  if (!imageResponse.ok && process.env.NODE_ENV === "development") {
    throw new Error("Failed to prefetch images");
  }
  const { images } = await imageResponse.json();
  return images as PrefetchImage[];
}

async function prefetchEmbeds(href: string) {
  if (!href.startsWith("/") || href.startsWith("/order") || href === "/") {
    return [];
  }
  const url = new URL(href, window.location.href);
  const embedResponse = await fetch(`/api/prefetch-embeds${url.pathname}`, {
    priority: "low",
  });
  if (!embedResponse.ok && process.env.NODE_ENV === "development") {
    throw new Error("Failed to prefetch embeds");
  }
  const { embeds } = await embedResponse.json();
  return embeds as PrefetchEmbed[];
}

/**
 * Convert href prop into a string.
 *
 * This function accepts either a string or an object with an optional
 * pathname, query and hash. If the pathname is null/undefined, it is
 * replaced with an empty string.
 */
function formatHref(
  href: string | {
    pathname?: string | null;
    query?: Record<string, any>;
    hash?: string;
  }
): string {
  if (typeof href === "string") {
    return href;
  }
  const pathname = href.pathname || "";
  let url = pathname;
  if (href.query) {
    const params = new URLSearchParams(href.query as any).toString();
    if (params.length) {
      url += `?${params}`;
    }
  }
  if (href.hash) {
    url += href.hash;
  }
  return url;
}

const seen = new Set<string>();
const imageCache = new Map<string, PrefetchImage[]>();

const seenEmbeds = new Set<string>();
const embedCache = new Map<string, PrefetchEmbed[]>();

export const Link: typeof NextLink = (({ children, ...props }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  // Use the browser timer, which returns a number.
  let prefetchTimeout: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    if (props.prefetch === false) return;

    const linkElement = linkRef.current;
    if (!linkElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          prefetchTimeout = setTimeout(async () => {
            const formattedHref = formatHref(props.href);
            router.prefetch(formattedHref);
            await sleep(0);

            if (!imageCache.has(formattedHref)) {
              void prefetchImages(formattedHref).then(
                (images) => {
                  imageCache.set(formattedHref, images);
                },
                console.error
              );
            }

            if (!embedCache.has(formattedHref)) {
              void prefetchEmbeds(formattedHref).then(
                (embeds) => {
                  embedCache.set(formattedHref, embeds);
                },
                console.error
              );
            }

            observer.unobserve(entry.target);
          }, 300);
        } else if (prefetchTimeout) {
          clearTimeout(prefetchTimeout);
          prefetchTimeout = null;
        }
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(linkElement);

    return () => {
      observer.disconnect();
      if (prefetchTimeout) {
        clearTimeout(prefetchTimeout);
      }
    };
  }, [props.href, props.prefetch, router]);

  return (
    <NextLink
      ref={linkRef}
      prefetch={false}
      onMouseEnter={() => {
        const formattedHref = formatHref(props.href);
        router.prefetch(formattedHref);
        const images = imageCache.get(formattedHref) || [];
        for (const image of images) {
          prefetchImage(image);
        }
        const embeds = embedCache.get(formattedHref) || [];
        for (const embed of embeds) {
          prefetchEmbed(embed);
        }
      }}
      onMouseDown={(e) => {
        const formattedHref = formatHref(props.href);
        const url = new URL(formattedHref, window.location.href);
        if (
          url.origin === window.location.origin &&
          e.button === 0 &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        ) {
          e.preventDefault();
          router.push(formattedHref);
        }
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
}) as typeof NextLink;

function prefetchImage(image: PrefetchImage) {
  if (image.loading === "lazy" || seen.has(image.srcset)) {
    return;
  }
  const img = new Image();
  img.decoding = "async";
  img.fetchPriority = "low";
  img.sizes = image.sizes;
  seen.add(image.srcset);
  img.srcset = image.srcset;
  img.src = image.src;
  img.alt = image.alt;
}

function prefetchEmbed(embed: PrefetchEmbed) {
  if (embed.loading === "lazy" || seenEmbeds.has(embed.src)) {
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.loading = embed.loading;
  iframe.src = embed.src;
  iframe.title = embed.title;
  seenEmbeds.add(embed.src);

  document.body.appendChild(iframe);

  iframe.onload = () => {
    setTimeout(() => {
      iframe.parentNode?.removeChild(iframe);
    }, 3000);
  };

  iframe.onerror = () => {
    iframe.parentNode?.removeChild(iframe);
  };
}
