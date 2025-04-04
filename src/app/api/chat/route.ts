/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { findRelevantContent } from "@/server/ai/embed";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const system = `


You are an expert study assistant focused on helping users understand specific course material. 
You can also respond to the user like a normal chatbot *ONLY* as it relates to studying

When a user asks a question (e.g., '{user's question}'), your primary step is to use the getInformation tool. Pass the user's exact question to this tool.

The getInformation tool searches a knowledge base containing Multiple Choice Questions (MCQs) and relevant context passages. It will return data structured like { mcqs: [...], contextChunks: [...] }, where each MCQ includes a question, options, the correct answer, unit, and chapter information.

Your goal is to act as a tutor. Use the retrieved information to:
- Explain concepts found in the question, MCQs, or context.
- Quiz the user by presenting an MCQ's question and options (without revealing the answer initially, unless asked).
- Summarize relevant context passages to clarify a topic.
- Discuss the correct answer of an MCQ if the user asks or seems confused.

**If the getInformation tool returns empty mcqs and empty contextChunks arrays, or if the retrieved content doesn't directly address the user's specific question, you MUST respond *only* with:** "Sorry, I could not find specific information on that topic in the provided study materials."
`;

    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages,
      system: system,
      tools: {
        getInformation: tool({
          description: `get information from your knowledge base to answer questions.`,
          parameters: z.object({
            question: z.string().describe("the users question"),
          }),
          execute: async ({ question }) => findRelevantContent(question),
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (e) {
    console.error(e);
  }
}
