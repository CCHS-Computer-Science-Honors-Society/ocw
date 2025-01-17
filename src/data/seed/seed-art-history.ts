import { db } from "@/server/db";
import { lessonEmbed, lessons, units } from "@/server/db/schema";

const unitInserts = [
  {
    id: "pacific-art",
    courseId: "ap-art-history",
    name: "1 Pacific Art",
    description:
      "Introduction to the art of the Pacific, including key vocab and flashcards.",
    isPublished: true,
    order: 1,
  },
  {
    id: "african-art",
    courseId: "ap-art-history",
    name: "2 African Art",
    description:
      "Explore African art with vocabulary, artists, and location flashcards.",
    isPublished: true,
    order: 2,
  },
  {
    id: "indigenous-art",
    courseId: "ap-art-history",
    name: "3 Indigenous Art",
    description: "Study Indigenous art with vocab and identifier resources.",
    isPublished: true,
    order: 3,
  },
  {
    id: "egyptian-mesopotamian-art",
    courseId: "ap-art-history",
    name: "4 Egyptian & Mesopotamian Art",
    description:
      "Discover Egyptian and Mesopotamian art, including vocabulary and identifiers.",
    isPublished: true,
    order: 4,
  },
  {
    id: "greek-roman-art",
    courseId: "ap-art-history",
    name: "4 Greek & Roman Art",
    description:
      "Learn about Greek and Roman art through vocabulary and identifier resources.",
    isPublished: true,
    order: 5,
  },
  {
    id: "european-art",
    courseId: "ap-art-history",
    name: "5 European Art",
    description:
      "Examine early European art through vocab, identifiers, and historical dates.",
    isPublished: true,
    order: 6,
  },
  {
    id: "baroque-renaissance-art",
    courseId: "ap-art-history",
    name: "6 Baroque and Renaissance Art",
    description:
      "Understand Baroque and Renaissance art through vocab and identifiers.",
    isPublished: true,
    order: 7,
  },
  {
    id: "romantic-islamic-art",
    courseId: "ap-art-history",
    name: "7 Romantic and Islamic Art",
    description:
      "Explore Romantic and Islamic art through vocab and identifiers.",
    isPublished: true,
    order: 8,
  },
  {
    id: "movements",
    courseId: "ap-art-history",
    name: "Movements",
    description: "Learn key dates and movements in art history.",
    isPublished: true,
    order: 9,
  },
  {
    id: "19th-20th-century-art",
    courseId: "ap-art-history",
    name: "8 19th and 20th Century Art",
    description:
      "Study art from the 19th and 20th centuries with vocab and identifiers.",
    isPublished: true,
    order: 10,
  },
  {
    id: "modern-art",
    courseId: "ap-art-history",
    name: "9 Modern Art",
    description:
      "Dive into Modern art through vocab and identifier flashcards.",
    isPublished: true,
    order: 11,
  },
  {
    id: "asian-art",
    courseId: "ap-art-history",
    name: "10 Asian Art",
    description:
      "Explore Asian art through vocabulary and identifier flashcards.",
    isPublished: true,
    order: 12,
  },
];

const lessonsInserts = [
  {
    id: "introduction-to-pacific-art",
    unitId: "pacific-art",
    name: "Introduction to AP Art History",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3bxn?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "introductory-vocabulary",
    unitId: "pacific-art",
    name: "Introductory Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3bss?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "pacific-art-flashcards",
    unitId: "pacific-art",
    name: "Pacific Art Flashcards",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3bg7?x=1qqt&i=4ea3xp",
    order: 3,
    isPublished: true,
  },
  {
    id: "african-art-vocabulary",
    unitId: "african-art",
    name: "African Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3cp3?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "african-artists-flashcards",
    unitId: "african-art",
    name: "African Artists Flashcards",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3cy6?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "african-art-locations",
    unitId: "african-art",
    name: "African Art Locations Flashcards",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3d10?x=1qqt&i=4ea3xp",
    order: 3,
    isPublished: true,
  },
  {
    id: "african-artwork-summaries",
    unitId: "african-art",
    name: "African Artwork Summaries",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3csy?x=1qqt&i=4ea3xp",
    order: 4,
    isPublished: true,
  },
  {
    id: "indigenous-art-vocabulary",
    unitId: "indigenous-art",
    name: "Indigenous Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3er8?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "indigenous-art-identifiers",
    unitId: "indigenous-art",
    name: "Indigenous Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu3exc?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "egyptian-mesopotamian-art-vocabulary",
    unitId: "egyptian-mesopotamian-art",
    name: "Egyptian and Mesopotamian Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu44ei?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "egyptian-mesopotamian-identifiers",
    unitId: "egyptian-mesopotamian-art",
    name: "Egyptian and Mesopotamian Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu44m3?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "egypt-new-kingdom-vs-old-kingdom",
    unitId: "egyptian-mesopotamian-art",
    name: "Egypt’s New Kingdom vs. Old Kingdom",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu44i2?x=1qqt&i=4ea3xp",
    order: 3,
    isPublished: true,
  },
  {
    id: "greek-roman-art-vocabulary",
    unitId: "greek-roman-art",
    name: "Greek and Roman Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu44sh?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "greek-roman-art-identifiers",
    unitId: "greek-roman-art",
    name: "Greek and Roman Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu44ve?x=1jqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "important-european-dates",
    unitId: "european-art",
    name: "Important Dates in Europe’s History",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu45h6?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "early-european-art-vocabulary",
    unitId: "european-art",
    name: "Early European Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu45pk?x=1jqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "early-european-art-identifiers",
    unitId: "european-art",
    name: "Early European Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu45tl?x=1qqt&i=4ea3xp",
    order: 3,
    isPublished: true,
  },
  {
    id: "baroque-renaissance-vocabulary",
    unitId: "baroque-renaissance-art",
    name: "Baroque and Renaissance Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu46n8?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "baroque-renaissance-identifiers",
    unitId: "baroque-renaissance-art",
    name: "Baroque and Renaissance Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu46rh?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "romantic-islamic-vocabulary",
    unitId: "romantic-islamic-art",
    name: "Romantic and Islamic Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu48ai?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "romantic-islamic-identifiers",
    unitId: "romantic-islamic-art",
    name: "Romantic and Islamic Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu4869?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "movement-dates",
    unitId: "movements",
    name: "Movement Dates",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu48h3?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "19th-20th-century-vocabulary",
    unitId: "19th-20th-century-art",
    name: "19th and 20th Century Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu48ng?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "19th-20th-century-identifiers",
    unitId: "19th-20th-century-art",
    name: "19th and 20th Century Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu48s3?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "modern-art-vocabulary",
    unitId: "modern-art",
    name: "Modern Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu48yp?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "modern-art-identifiers",
    unitId: "modern-art",
    name: "Modern Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu4923?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
  {
    id: "asian-art-vocabulary",
    unitId: "asian-art",
    name: "Asian Art Vocabulary",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu4a9g?x=1qqt&i=4ea3xp",
    order: 1,
    isPublished: true,
  },
  {
    id: "asian-art-identifiers",
    unitId: "asian-art",
    name: "Asian Art Identifiers",
    contentType: "quizlet" as const,
    embedUrl: "https://quizlet.com/_bu4abt?x=1qqt&i=4ea3xp",
    order: 2,
    isPublished: true,
  },
];

const lessonEmbedInserts = lessonsInserts.map((lesson) => ({
  id: `${lesson.id}-embed`,
  lessonId: lesson.id,
  embedUrl: lesson.embedUrl,
  password: null,
}));

async function seedArtHistory() {
  try {
    console.log("Seeding Art History...");
    await db.insert(units).values(unitInserts).onConflictDoNothing();
    console.log("Finished Units");
    console.log("Seeding Lessons...");
    await db
      .insert(lessons)
      .values(lessonsInserts.map(({ embedUrl, ...lesson }) => lesson))
      .onConflictDoNothing();
    console.log("Finished Lessons");
    console.log("Seeding Lesson Embeds...");
    await db
      .insert(lessonEmbed)
      .values(lessonEmbedInserts)
      .onConflictDoNothing();
    console.log("Finished Lesson Embeds");
  } catch (error) {
    console.log(error);
  }
}

await seedArtHistory();
