import { getCourseById } from "@/server/api/scripts"
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "A Course on Creek OCW";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const course = await getCourseById(id)

  if (!course) {
    notFound()
  }
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          position: 'relative',
          overflow: 'hidden', // Added to prevent potential overflow issues
        }}
      >
        {/* Background Image */}
        <img
          src={course.imageUrl}
          alt={course.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        {/* Overlay for better text visibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
          }}
        />
        {/* Course Name */}
        <div
          style={{
            position: 'absolute',
            left: 50,
            bottom: 50,
            fontSize: 60,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened for better visibility
            fontWeight: 'bold',
            color: 'white',
            maxWidth: '80%',
            padding: '10px 20px', // Added padding
            borderRadius: 10, // Added rounded corners
          }}
        >
          {course.name + "| Creek OCW"}
        </div>
        {/* Number of Units */}
        <div
          style={{
            position: 'absolute',
            right: 50,
            top: 50,
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px 20px',
            borderRadius: 10,
            zIndex: 10, // Ensure it's on top of other elements
          }}
        >
          {course.units.length} Units
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

