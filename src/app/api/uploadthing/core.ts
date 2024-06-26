import { getServerAuthSession } from "@/server/auth";
import { log } from "console";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const handleAuth = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user) throw new Error("Unauthorized");
  const userId = session.user.id
  return { userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      log("finised upload for image")
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
