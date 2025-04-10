"use client";

import type { Attachment } from "ai";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { MultimodalInput } from "./input";
import { Messages } from "./messages";
import { toast } from "sonner";

export function Chat() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      Due to very high traffic, we are currently exceeding our free limit for
      the AI. We apologize for the inconvenience and will be back soon.
    </div>
  );
}

const Unused = () => {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    onError: () => {
      toast.error("An error occured, please try again!");
    },
  });

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <>
      <div className="bg-background flex h-dvh min-w-0 flex-col">
        <Messages
          status={status}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={false}
        />

        <form className="bg-background mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
          <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            status={status}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
          />
        </form>
      </div>
    </>
  );
};
