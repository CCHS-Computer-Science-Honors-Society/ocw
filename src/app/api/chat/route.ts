/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { google } from "@ai-sdk/google";
import {
  streamText,
  ToolExecutionError,
  InvalidToolArgumentsError,
  NoSuchToolError,
} from "ai";
import { getInformationTool } from "@/lib/ai/tools/get-information-tool";

export const maxDuration = 60;

export async function POST(req: Request) {
  return new Response("Rate Limit Hit", { status: 429 });
  try {
    const { messages } = await req.json();

    const system = `You are an expert study assistant focused on helping users understand specific course material.
If the tool returns no specific information, state that you can't find info but try and help anyway.
For general conversation or questions not related to the course material, you can answer directly.

When the user asks for help with a testing/practice quiz, call the getInformation tool and  modify the question to better get results from the knowledge base.
We use cosineDistance to measure the similarity between the question and the context.
So transform questions into a form that is easier to understand.

once you call the getInformation tool it shows MCQ UI, don't repeat the questions that you gain as context, just be ready to answer questions about the practice quiz.

if they user asks you to write code, say that you currently cannot write code but in the future will support code execution and code help and refuse to generate the code 
`;

    const result = streamText({
      model: google("gemini-2.5-pro-exp-03-25"),
      messages,
      system: system,
      tools: {
        getInformation: getInformationTool,
      },
      maxSteps: 5,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        if (NoSuchToolError.isInstance(error)) {
          console.error("Error: Model tried to call an unknown tool:", error);
          return "Error: An internal tool configuration issue occurred.";
        } else if (InvalidToolArgumentsError.isInstance(error)) {
          console.error("Error: Model called a tool with invalid args:", error);
          return "Error: There was an issue processing the request parameters.";
        } else if (ToolExecutionError.isInstance(error)) {
          console.error("Error during tool execution:", error);
          return `Error: Failed to execute tool "${error.toolName}".`;
        } else {
          console.error("Unhandled stream error:", error);
          return "An unexpected error occurred.";
        }
      },
    });
  } catch (e) {
    console.error("Error in POST handler:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
