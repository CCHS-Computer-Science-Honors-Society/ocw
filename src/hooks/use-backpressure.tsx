import { useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Manage backpressure for search input updates in the Next.js App Router.
 *
 * 1. When a new search is triggered, it immediately updates the URL.
 * 2. It keeps track of the last URL that was updated and the number of updates.
 * 3. It adds a delay (default 300ms, customizable) before allowing more updates.
 * 4. If an update occurs during this delay, it triggers another form submission.
 * 5. The `shouldSuspend` flag is set to true while there are pending updates.
 * 6. The parent component can use the `shouldSuspend` flag to suspend rendering.
 * 7. When finished, it resets the state and `shouldSuspend` is set to false.
 * 8. When the parent component resumes, it reflects the latest search results.
 *
 * This prevents a janky UX when the user types quickly. We don't want different results
 * to flash on the screen as the user types.
 *
 * Transitions allow you to update state without blocking the UI. When the form is
 * submitted from an Action, this will automatically trigger a React Transition.
 * Searching remains responsive and the UI remains interactive while the search results
 * are being queried. Further, we can observe the `pending` state of a transition and
 * show a loading spinner or skeleton UI.
 */

export function useBackpressure(delay = 300) {
  const router = useRouter();
  const isUpdatingRef = useRef(false);
  const updateCountRef = useRef(0);
  const latestUrlRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  async function triggerUpdate(newUrl: string) {
    updateCountRef.current++;
    latestUrlRef.current = newUrl;

    if (!isUpdatingRef.current) {
      isUpdatingRef.current = true;
      const currentUpdateCount = updateCountRef.current;

      router.replace(newUrl);

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          isUpdatingRef.current = false;
          if (updateCountRef.current !== currentUpdateCount) {
            formRef.current?.requestSubmit();
          }
          resolve();
        }, delay);
      });
    }
  }

  const shouldSuspend = updateCountRef.current > 0 && !isUpdatingRef.current;

  return { triggerUpdate, shouldSuspend, formRef };
}
