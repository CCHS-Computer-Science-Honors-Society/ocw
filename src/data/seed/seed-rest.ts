import { db } from "@/server/db";
import { lessonEmbed, lessons, units } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const data = [
  {
    courseId: "apbio",
    unitName: "General Resources",
    unitId: "general_resources_ap_biology",
    name: "Complete Illustrated AP Biology Notes",
    order: 1,
    link: "https://drive.google.com/drive/folders/14yYVXapSKpigV426uNl7B105Xpm4o3M3?usp=sharing",
    type: "google_docs",
  },
  {
    courseId: "apbio",
    unitName: "General Resources",
    unitId: "general_resources_ap_biology",
    order: 2,
    name: "Digital Cell Poster with Cell Notes",
    link: "https://docs.google.com/presentation/d/1EytAO_0NgdTsoO7hrIX-9NIm4B9DLXVQC-rscWTnHkM/edit?usp=sharing",
    type: "google_docs",
  },
  {
    courseId: "apbio",
    unitName: "General Resources",
    order: 3,
    unitId: "general_resources_ap_biology",
    name: "Complete Guide to a Earning a 5 on the AP Biology Exam",
    link: "https://creekocw.wordpress.com/wp-content/uploads/2022/12/eb66f-matthewandersonguideto5onapbio.pdf",
    type: "google_docs",
  },
  {
    courseId: "cp-physical-science",
    order: 1,
    unitName: "Final Review",
    unitId: "final_review_cp_physical_science",
    name: "Final Review Quizlet",
    link: "https://quizlet.com/729763742/physical-science-final-exam-review-flash-cards/",
    type: "quizlet",
  },
  {
    courseId: "honors-biology",
    order: 1,
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 1",
    link: "https://quizlet.com/726989377/biology-study-guide-unit-1-flash-cards/",
    type: "quizlet",
  },
  {
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    order: 2,
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 2",
    link: "https://quizlet.com/727005179/biology-honors-study-guide-unit-2-flash-cards/",
    type: "quizlet",
  },
  {
    order: 3,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 3",
    link: "https://quizlet.com/727005288/biology-honors-study-guide-unit-3-flash-cards/",
    type: "quizlet",
  },
  {
    order: 4,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 4",
    link: "https://quizlet.com/727005335/biology-honors-study-guide-unit-4-flash-cards/",
    type: "quizlet",
  },
  {
    order: 4,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 6",
    link: "https://quizlet.com/727005419/biology-honors-study-guide-unit-6-flash-cards/",
    type: "quizlet",
  },
  {
    order: 5,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 7",
    link: "https://quizlet.com/727005493/biology-honors-study-guide-unit-7-flash-cards/",
    type: "quizlet",
  },
  {
    order: 6,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 8",
    link: "https://quizlet.com/727005553/biology-honors-study-guide-unit-8-flash-cards/",
    type: "quizlet",
  },
  {
    order: 7,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Study Guide Unit 9",
    link: "https://quizlet.com/727005598/biology-honors-study-guide-unit-9-flash-cards/",
    type: "quizlet",
  },
  {
    order: 8,
    courseId: "honors-biology",
    unitName: "Unit Review Quizlets",
    unitId: "unit_review_quizlets_honors_biology",
    name: "Biology Honors Ecology Study Guide",
    link: "https://quizlet.com/727005730/biology-honors-ecology-study-guide-flash-cards/",
    type: "quizlet",
  },
  {
    order: 9,
    courseId: "honors-biology",
    unitName: "Vocabulary",
    unitId: "vocabulary_honors_biology",
    name: "Nervous System",
    link: "https://quizlet.com/727005806/biology-honors-nervous-system-terms-flash-cards/",
    type: "quizlet",
  },
  {
    order: 10,
    courseId: "honors-biology",
    unitName: "Vocabulary",
    unitId: "vocabulary_honors_biology",
    name: "Cell Parts",
    link: "https://quizlet.com/727005856/biology-honors-cell-parts-flash-cards/",
    type: "quizlet",
  },
  {
    order: 1,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapters 1 & 2: Measurement and Motion",
    link: "https://docs.google.com/document/d/1YgvrN6xJtDmWDpi4rwxzSLz257C84xoVpSfNGJcO0Xs/edit?usp=sharing",
    type: "google_docs",
  },
  {
    order: 2,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 4: Motion in 2D",
    link: "https://drive.google.com/file/d/1zF2K2cacpoIQbc9SeMyr0S8edgaq9ljW/view?usp=sharing",
    type: "google_docs",
  },
  {
    order: 3,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 5: Force & Motion Part 1",
    link: "https://drive.google.com/file/d/1XD4Z4VrwsCXP3JMxsOhGsAaYIZHKXIS8/view?usp=sharing",
    type: "google_docs",
  },
  {
    order: 4,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 6: Friction",
    link: "https://drive.google.com/file/d/1IdF2CAxa3QJs-67zzGaI4A-5mY0Uvbth/view?usp=sharing",
    type: "google_docs",
  },
  {
    order: 5,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 7: Kinetic Energy",
    link: "https://drive.google.com/file/d/1997P5dhv5F4V6gsAKaqtW-PM0diZF4dg/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 6,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 8: Potential Energy",
    link: "https://drive.google.com/file/d/1iFdfN9hH6BOyAKTbITkRfEwuXGrCRlGJ/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 7,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 9: Systems of Particles",
    link: "https://drive.google.com/file/d/1_dh6QpMUHPT3pw0k6ZK6BpGIn5rlq_eh/view?usp=sharing",
    type: "google_docs",
  },
  {
    order: 8,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 10: Collisions",
    link: "https://drive.google.com/file/d/17NBdo9eg_IQlZdslMliTjAyCgS-HKrwA/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 9,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 11: Rotations",
    link: "https://drive.google.com/file/d/1PkRZH98YE8yJncyK6dJLFmZG57LzWkt4/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 10,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 12: Rolling and Angular Momentum",
    link: "https://drive.google.com/file/d/1o-zZJmkHO0Btw1FYV-OvwExPQY8_vrsp/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 11,
    courseId: "ap-physics-c",
    unitName: "Mechanics",
    unitId: "mechanics_ap_physics_c",
    name: "Chapter 14: Gravity",
    link: "https://drive.google.com/file/d/1morakyDAbOrKiKmVgAZytadoN2FwCcvT/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 1,
    courseId: "ap-physics-c",
    unitName: "Electricity and Magnetism",
    unitId: "electricity_and_magnetism_ap_physics_c",
    name: "Vector Field Visualization Tool",
    link: "https://www.falstad.com/vector2de/vector2de.html?f=InverseSquaredRadialDipole&fc=Floor%3A%20field%20magnitude&fl=Overlay%3A%20equipotentials&d=vectors&m=Mouse%20%3D%20Adjust%20Angle&st=7&vd=43&a1=50&ft=true&rx=63&ry=0&rz=0&zm=1.2",
    type: "google_docs",
  },
  {
    order: 2,
    courseId: "ap-physics-c",
    unitName: "Electricity and Magnetism",
    unitId: "electricity_and_magnetism_ap_physics_c",
    name: "Electric Field Calculator",
    link: "https://www.falstad.com/emstatic/EMStatic.html",
    type: "google_docs",
  },
  {
    order: 3,
    courseId: "ap-physics-c",
    unitName: "Electricity and Magnetism",
    unitId: "electricity_and_magnetism_ap_physics_c",
    name: "Dr. H's Capacitor Simulation",
    link: "https://www.geogebra.org/m/jzq7femh",
    type: "google_docs",
  },
  {
    order: 4,
    courseId: "ap-physics-c",
    unitName: "Electricity and Magnetism",
    unitId: "electricity_and_magnetism_ap_physics_c",
    name: "Circuit Calculator",
    link: "http://www.falstad.com/circuit/circuitjs.html",
    type: "google_docs",
  },

  {
    order: 1,
    courseId: "ap-microeconomics",
    unitName: "Microeconomics Notes by chapter:",
    unitId: "microeconomics_notes_by_chapter__ap_microeconomics",
    name: "Chapter 1: Intro Concepts",
    link: "https://drive.google.com/file/d/1SZkuZyK8HrIKFip-VuZMYJFyee2l2pyP/view?usp=sharing",
    type: "google_docs",
  },
  {
    order: 2,
    courseId: "ap-microeconomics",
    unitName: "Microeconomics Notes by chapter:",
    unitId: "microeconomics_notes_by_chapter__ap_microeconomics",
    name: "Chapter 2: Supply and Demand",
    link: "https://drive.google.com/file/d/1EALm1Bh92LBL25NkMkg0D5JJOaH0aNln/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 3,
    courseId: "ap-microeconomics",
    unitName: "Microeconomics Notes by chapter:",
    unitId: "microeconomics_notes_by_chapter__ap_microeconomics",
    name: "Chapter 3: Trade",
    link: "https://drive.google.com/file/d/1uubIYRnN8EX7r67cx9vBc6WpqYqhqkxm/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 4,
    courseId: "ap-microeconomics",
    unitName: "Microeconomics Notes by chapter:",
    unitId: "microeconomics_notes_by_chapter__ap_microeconomics",
    name: "Chapter 4: Market Competition",
    link: "https://drive.google.com/file/d/1wH75cFLfFJX0iSL5_K8ar3_4MlUAzQEJ/view?usp=share_link",
    type: "google_docs",
  },
  {
    order: 5,

    courseId: "ap-microeconomics",
    unitName: "Microeconomics Notes by chapter:",
    unitId: "microeconomics_notes_by_chapter__ap_microeconomics",
    name: "Chapter 5: Income Distribution",
    link: "https://drive.google.com/file/d/11IbCMRuOb0nAmY-jgNd9ZnCsblVS9hy4/view?usp=share_link",
    type: "google_docs",
  },

  {
    order: 1,
    courseId: "ap-world-history",
    unitName: "Overall Review",
    unitId: "overall_review_ap_world_history",
    name: "Semester 1 Overall Review (Periods 1 and 2)",
    link: "https://docs.google.com/document/d/1_ViGSiaZcBcBK6tef6dXLqJhbLkfe1Z8J96zDZgoYx0/edit?usp=sharing",
    type: "google_docs",
  },
  {
    order: 1,
    courseId: "ap-world-history",
    unitName: "Pre 1200:",
    unitId: "pre_1200__ap_world_history",
    name: "Basics of Major Religions and Philosophies Chart",
    link: "https://docs.google.com/document/d/1-HaktTwjoiMJUEKNv6DExhHc75XMekjiYl-0VKztFTU/edit?usp=sharing",
    type: "google_docs",
  },
  {
    order: 1,
    courseId: "ap-world-history",
    unitName: "Period 1: 1200-1450",
    unitId: "period_1_1200_1450_ap_world_history",
    name: "Period 1 Review",
    link: "https://docs.google.com/document/d/1Qb3F-d3PuTL1Y5Yq_8M4q0on2QH0Y3m55LCDJlygJqg/edit?usp=sharing",
    type: "google_docs",
  },
  {
    order: 2,
    courseId: "ap-world-history",
    unitName: "Period 1: 1200-1450",
    unitId: "period_1_1200_1450_ap_world_history",
    name: "Compiled Teacher Slides of Period 1",
    link: "https://docs.google.com/presentation/d/1apo7UvdzBub3pC0Vdj-s9N6wmv1S9InUkLlyX7kTw4s/edit?usp=sharing",
    type: "google_docs",
  },
  {
    order: 1,
    courseId: "ap-world-history",
    unitName: "Period 2: 1450-1750",
    unitId: "period_2_1450_1750_ap_world_history",
    name: "Land vs. Maritime Based Empires Comparison Chart",
    link: "https://docs.google.com/document/d/1TbtNQAOHMBEO4jx_r3a76qQarLcqyg-DKjI86o2aazc/edit?usp=sharing",
    type: "google_docs",
  },
];

function mapContentType(rawType: string) {
  // Allowed enum values: "google_docs", "notion", "quizlet", "tiptap", "flashcard"
  switch (rawType) {
    case "google_docs":
    case "notion":
    case "quizlet":
    case "tiptap":
    case "flashcard":
      return rawType;
    default:
      return "tiptap";
  }
}

export async function insertLessons() {
  // All operations in a single transaction for efficiency
  await db.transaction(async (tx) => {
    for (const [_, item] of data.entries()) {
      // Upsert the unit
      const existingUnit = await tx
        .select()
        .from(units)
        .where(eq(units.id, item.unitId));
      if (existingUnit.length === 0) {
        // create the unit if it doesn't exist
        await tx.insert(units).values({
          id: item.unitId,
          courseId: item.courseId,
          name: item.unitName,
          description: "",
          isPublished: false,
          order: 0,
        });
      }

      // Insert the lesson and get its ID
      // const [newLesson] = await tx
      //   .insert(lessons)
      //   .values({
      //     order: item.order, // example ordering by index
      //     isPublished: false,
      //     contentType: mapContentType(item.type),
      //     unitId: item.unitId,
      //     name: item.name,
      //     content: { link: item.link },
      //   })
      //   .returning({ id: lessons.id });

      // if (!newLesson) {
      //   return;
      // }
      // // Create a corresponding embed row
      // await tx.insert(lessonEmbed).values({
      //   lessonId: newLesson?.id,
      //   embedUrl: item.link,
      //   password: null, // or some logic if needed
      // });
    }
  });
}

await insertLessons();
