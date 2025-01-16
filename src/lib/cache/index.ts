import { cache } from "react";
import { unstable_cache as next_unstable_cache } from "next/cache";

// next_unstable_cache doesn't handle deduplication, so we wrap it in React's cache
export const hard_cache = <Inputs extends unknown[], Output>(
  callback: (...args: Inputs) => Promise<Output>,
  key: string[],
  options: { revalidate?: number, tags?: string[] },
) => cache(next_unstable_cache(callback, key, options));

export const unstable_cache = next_unstable_cache;
