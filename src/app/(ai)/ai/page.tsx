"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 20,
  }); // useChat handles the stream updates

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {/* Render messages */}
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              {/* Render message content */}
              <p>{m.content}</p>

              {/* Optional: Display tool invocation information */}
              {m.toolInvocations?.map((toolInvocation) => (
                <div
                  key={toolInvocation.toolCallId}
                  className="bg-background border-primary/20 my-2 rounded-md border p-2 text-sm"
                >
                  <p>
                    <strong>Tool Call:</strong> {toolInvocation.toolName}(
                    {JSON.stringify(toolInvocation.args)})
                  </p>
                  {/* Find the corresponding result message */}
                  {messages.find(
                    (msg) =>
                      msg.role === "assistant" &&
                      msg.toolInvocations?.[0]?.toolCallId ===
                        toolInvocation.toolCallId,
                  ) && (
                    <p className="border-primary/20 mt-1 border-t pt-1">
                      <strong>Tool Result:</strong>{" "}
                      {/* Displaying result might need formatting depending on what findRelevantContent returns */}
                      {
                        messages.find(
                          (msg) =>
                            msg.role === "assistant" &&
                            msg.toolInvocations?.[0]?.toolCallId ===
                              toolInvocation.toolCallId,
                        )?.content
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Optional: Indicate when a tool is being called */}
      </div>

      {/* Input form */}
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
