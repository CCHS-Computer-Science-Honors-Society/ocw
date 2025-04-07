"use client";

import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { type ToolInvocation } from "ai";

// Helper function to find the tool result message
const findToolResultMessage = (
  messages: Array<{
    id: string;
    role: "user" | "assistant" | "system" | "function" | "data" | "tool";
    content: string;
    createdAt?: Date | undefined;
    toolInvocations?: ToolInvocation[] | undefined;
    toolCallId?: string;
  }>,
  toolCallId: string,
) => {
  return messages.find(
    (msg) => msg.role === "tool" && msg.toolCallId === toolCallId,
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 20,
  });

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div className="font-bold">{m.role}</div>
            <div>
              {m.parts.map((part, index) => {
                switch (part.type) {
                  case "tool-invocation": {
                    const callId = part.toolInvocation.toolCallId;
                    const toolResultMessage = findToolResultMessage(
                      messages,
                      callId,
                    );

                    switch (part.toolInvocation.toolName) {
                      case "getInformation":
                        if (toolResultMessage) {
                          // Result is available, show call and result
                          return (
                            <div
                              className="bg-background border-primary/20 my-2 rounded-md border p-2 text-sm"
                              key={`${m.id}-tool-${callId}-result`}
                            >
                              <p>
                                <strong>Tool Call:</strong>{" "}
                                {part.toolInvocation.toolName}(
                                {JSON.stringify(part.toolInvocation.args)})
                                <br />
                                <strong>Tool Result:</strong>{" "}
                                {toolResultMessage.content}
                              </p>
                            </div>
                          );
                        } else {
                          // Result not yet available, show loading state
                          return (
                            <div
                              className="bg-background border-primary/20 my-2 flex items-center space-x-2 rounded-md border p-2 text-sm"
                              key={`${m.id}-tool-${callId}-loading`}
                            >
                              <svg
                                className="text-primary h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Getting context...</span>
                              <span className="text-muted-foreground ml-auto text-xs">
                                ({part.toolInvocation.toolName}:{" "}
                                {JSON.stringify(part.toolInvocation.args)})
                              </span>
                            </div>
                          );
                        }
                      // Add cases for other tool names if needed
                      default:
                        // Default rendering for other tools (no specific loading state)
                        return (
                          <div
                            key={`${m.id}-tool-${callId}`}
                            className="text-muted-foreground my-2 rounded-md border p-2 text-sm"
                          >
                            Tool call: {part.toolInvocation.toolName}(
                            {JSON.stringify(part.toolInvocation.args)})
                          </div>
                        );
                    }
                  }
                  case "text": {
                    return (
                      <MemoizedMarkdown
                        id="text"
                        key={`${m.id}-text-${index}`}
                        content={part.text}
                      />
                    );
                  }
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Ask about the course material..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
