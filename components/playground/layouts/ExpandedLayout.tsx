"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";

import ChatInput from "../components/ui/ChatInput";

interface ExpandedLayoutProps {
  children: React.ReactNode;
  chatInput?: React.ReactNode;
  isOverPlayground?: boolean;
  widgetContext?: any;
  externalMessage?: string;
  onExternalMessageClear?: () => void;
  onImageGeneration?: (prompt: string) => void;
  onResearchMessage?: (message: string) => void;
}

export const ExpandedLayout: React.FC<ExpandedLayoutProps> = ({
  children,
  isOverPlayground = false,
  widgetContext,
  externalMessage = "",
  onExternalMessageClear,
  onImageGeneration,
  onResearchMessage,
}) => {
  return (
    <Card
      className={`flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-colors duration-200 ${
        isOverPlayground ? "bg-white/10 border-white/30" : ""
      }`}
    >
      <CardBody className="p-0 flex flex-col min-h-[300px] h-[400px] sm:h-[500px] lg:h-[calc(100vh-240px)] lg:max-h-[calc(100vh-240px)] relative">
        <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 pb-16 sm:pb-20 lg:pb-24">
          <div className="flex-1 rounded-lg flex flex-col overflow-visible relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {children}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-transparent">
          <ChatInput
            externalMessage={externalMessage}
            widgetContext={widgetContext}
            onExternalMessageClear={onExternalMessageClear}
            onImageGeneration={onImageGeneration}
            onResearchMessage={onResearchMessage}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ExpandedLayout;
