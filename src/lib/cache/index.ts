import { cache as react_cache } from "react";
import {
  unstable_cache as next_unstable_cache,
  unstable_cacheLife,
} from "next/cache";
import { unstable_cacheTag } from "next/cache";

// next_unstable_cache doesn't handle deduplication, so we wrap it in React's cache
export const cache = <Inputs extends unknown[], Output>(
  callback: (...args: Inputs) => Promise<Output>,
  key: string[],
  options: { revalidate?: number; tags?: string[] },
) => react_cache(next_unstable_cache(callback, key, options));

export const unstable_cache = next_unstable_cache;

export const REVALIDATE = 60 * 60 * 2;

export const REVALIDATE_WEEK = 60 * 60 * 24 * 7;

export const cacheTag = unstable_cacheTag;

export const cacheLife = unstable_cacheLife;
