import { google } from "@ai-sdk/google";
import {
  streamText,
  ToolExecutionError,
  InvalidToolArgumentsError,
  NoSuchToolError,
} from "ai";
import { getInformationTool } from "@/lib/ai/tools/get-information-tool";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const system = `You are an expert study assistant focused on helping users understand specific course material.
When asked a question about the course material, you MUST first use the 'getInformation' tool to retrieve relevant context from the knowledge base.
After receiving the information from the tool, synthesize the information and answer the user's question based *only* on the provided context and the current conversation history.
Do not answer questions about course material from your general knowledge before using the tool.
If the tool returns no specific information, state that you can't find info but try and help anyway.
For general conversation or questions not related to the course material, you can answer directly.`;

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
