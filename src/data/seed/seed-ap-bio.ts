import { db } from "@/server/db";
import { courses, units } from "@/server/db/schema";
import { eq } from "drizzle-orm";

async function insertApBioUnits() {
  const courseName = "apbio";
  const numberOfUnits = 7;

  try {
    console.log(`Looking for course with name: ${courseName}`);

    // 1. Find the existing course ID
    const existingCourse = await db
      .select({ id: courses.id })
      .from(courses)
      .where(eq(courses.id, courseName))
      .limit(1); // Ensure we only get one result

    if (!existingCourse || existingCourse.length === 0) {
      console.error(`Error: Course named "${courseName}" not found.`);
      console.error(
        "Please ensure the course exists before running this script.",
      );
      return; // Stop execution if course doesn't exist
    }

    const courseId = existingCourse[0]?.id;
    console.log(`Found course "${courseName}" with ID: ${courseId}`);

    // 2. Prepare Unit data using the retrieved courseId
    const unitsToInsert = [];
    for (let i = 1; i <= numberOfUnits; i++) {
      const unitId = `${courseName}-unit${i}`; // Use the specified ID format
      unitsToInsert.push({
        id: unitId,
        courseId: courseName, // Link to the existing course
        name: `Unit ${i}`, // Add descriptive names
        description: `Content for AP Bio Unit ${i}`, // Add descriptive descriptions
        order: i, // Set the order
        isPublished: false, // Default to not published
      });
    }

    console.log(
      `Attempting to insert ${unitsToInsert.length} units for course ID: ${courseId}`,
    );

    // 3. Insert all Units
    const insertedUnits = await db
      .insert(units)
      .values(unitsToInsert)
      .onConflictDoNothing() // Optional: Prevent errors if a unit ID already exists
      .returning(); // Return all columns of inserted units

    console.log(
      `Successfully inserted ${insertedUnits.length} units.`,
      insertedUnits.length < unitsToInsert.length
        ? `(${unitsToInsert.length - insertedUnits.length} units might have already existed if using onConflictDoNothing)`
        : "",
    );
    // console.log("Inserted Units:", insertedUnits); // Optional: log details
  } catch (error) {
    console.error("Error during unit insertion:", error);
    // Handle potential errors, e.g., constraint violations if not using onConflictDoNothing
  }
}
// Run the insertion function
insertApBioUnits()
  .then(() => {
    console.log("Unit insertion script finished.");
    // process.exit(0); // Optional: exit script
  })
  .catch((err) => {
    console.error("Unit insertion script failed:", err);
    // process.exit(1); // Optional: exit script with error code
  });
