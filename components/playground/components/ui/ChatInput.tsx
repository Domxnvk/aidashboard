"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Icon } from "@iconify/react";

interface WidgetContext {
  type: string;
  title: string;
  placeholder: string;
  icon: string;
}

interface ChatInputProps {
  externalMessage?: string;
  onExternalMessageClear?: () => void;
  widgetContext?: WidgetContext | null;
  onImageGeneration?: (prompt: string) => void;
  onResearchMessage?: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  externalMessage,
  onExternalMessageClear,
  widgetContext,
  onImageGeneration,
  onResearchMessage,
}) => {
  const [message, setMessage] = useState("");

  const displayMessage = externalMessage || message;

  const handleValueChange = (value: string) => {
    if (externalMessage) {
      onExternalMessageClear?.();
      setMessage(value);
    } else {
      setMessage(value);
    }
  };

  const handleSend = () => {
    const messageToSend = displayMessage.trim();
    if (!messageToSend) return;

    if (widgetContext) {
      console.log(`Sending message to ${widgetContext.title}:`, messageToSend);
      switch (widgetContext.type) {
        case "image-generation":
          console.log("Processing image generation request:", messageToSend);
          onImageGeneration?.(messageToSend);
          break;
        case "document-ai":
          console.log("Processing document AI query:", messageToSend);
          break;
        case "research-helper":
          console.log("Processing research request:", messageToSend);
          onResearchMessage?.(messageToSend);
          break;
        default:
          console.log("Processing general widget message:", messageToSend);
      }
    } else {
      console.log("Sending general message:", messageToSend);
    }

    if (externalMessage) {
      onExternalMessageClear?.();
    } else {
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const getPlaceholder = () => {
    if (widgetContext) {
      return widgetContext.placeholder;
    }

    return "Type your message here...";
  };

  const getContextIcon = () => {
    if (!widgetContext) return "material-symbols:chat-rounded";
    return widgetContext.icon;
  };

  return (
    <div
      className="w-full"
      role="presentation"
      tabIndex={-1}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={() => {}}
    >
      {widgetContext && (
        <div className="flex items-center gap-2 mb-2 px-2">
          <Icon className="text-white/60 w-4 h-4" icon={getContextIcon()} />
          <span className="text-white/60 text-xs">
            Chatting with {widgetContext.title}
          </span>
        </div>
      )}

      <Input
        fullWidth
        classNames={{
          inputWrapper:
            "bg-transparent backdrop-blur-sm border border-white/20",
          input: "text-white/80 placeholder:text-white/40",
        }}
        endContent={
          <div className="flex items-center">
            <button
              className={`flex items-center justify-center transition-opacity ${
                displayMessage.trim()
                  ? "text-white opacity-100"
                  : "text-default-400 opacity-50 cursor-not-allowed"
              }`}
              disabled={!displayMessage.trim()}
              onClick={handleSend}
            >
              <Icon
                height="24"
                icon="material-symbols:send-rounded"
                width="24"
              />
            </button>
          </div>
        }
        placeholder={getPlaceholder()}
        value={displayMessage}
        variant="bordered"
        onKeyDown={handleKeyDown}
        onValueChange={handleValueChange}
      />
    </div>
  );
};

export default ChatInput;
