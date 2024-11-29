import React from "react";
import { NotionAPI } from "notion-client";
import { NotionClient } from "./notion-client";

const notion = new NotionAPI();

export async function Notion({ embedId }: { embedId: string | null }) {
  if (!embedId) {
    return (
      <div>
        No Embed Id, contact the person who runs this course to get it fixed
      </div>
    );
  }

  const recordMap = await notion.getPage(embedId);
  return (
    <div>
      <NotionClient recordMap={recordMap} />
    </div>
  );
}
