import { findRelevantContent } from "@/server/ai/embed"; // Adjust path if needed
import { tool } from "ai";
import { z } from "zod";

// The `tool` helper function ensures correct type inference
export const getInformationTool = tool({
  description: `Get information from the knowledge base about course material to answer the user's question. Only use this for questions related to the course material provided.`,
  parameters: z.object({
    question: z
      .string()
      .describe(
        "The specific question the user asked that requires information retrieval.",
      ),
  }),
  execute: async ({ question }) => {
    console.log(`TOOL CALLED: getInformation with question: "${question}"`);
    try {
      const relevantContent = await findRelevantContent(question);
      console.log("TOOL RESULT:", relevantContent);
      // Ensure the result is serializable (string is safe)
      // If findRelevantContent returns complex objects, you might need to format them
      return (
        relevantContent || "No specific information found for that question."
      );
    } catch (error) {
      console.error("Error executing getInformation tool:", error);
      return "There was an error retrieving information.";
    }
  },
});
