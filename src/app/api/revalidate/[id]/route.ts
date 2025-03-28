import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Fix: Correct parameter structure for App Router route handlers
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Get the course ID from the URL params
  const courseId = (await params).id;

  try {
    // Try both with and without trailing slash
    const path = `/course/${courseId}`;
    console.log(`Revalidating path: ${path}`);
    revalidatePath(path, "layout");

    // Also try revalidating the root path
    console.log("Also revalidating root path");
    revalidatePath("/", "layout");

    console.log(`Revalidation completed for course: ${courseId}`);
    // Return a success response
    return NextResponse.json({
      success: true,
      message: `Revalidated course ${courseId} and all its sub-routes`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Handle any errors
    console.error(`Error revalidating course ${courseId}:`, error);

    return NextResponse.json(
      {
        success: false,
        message: "Error revalidating course",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
