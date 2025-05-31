"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";

import DroppableArea from "../components/dnd/DroppableArea";
import ChatInput from "../components/ui/ChatInput";

interface GridLayoutProps {
  children: React.ReactNode;
  isOverPlayground?: boolean;
  isEmpty?: boolean;
  placeholderComponent?: React.ReactNode;
  widgetContext?: any;
  externalMessage?: string;
  onExternalMessageClear?: () => void;
  onImageGeneration?: (prompt: string) => void;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  isOverPlayground = false,
  isEmpty = false,
  placeholderComponent,
  widgetContext,
  externalMessage = "",
  onExternalMessageClear,
  onImageGeneration,
}) => {
  return (
    <Card
      className={`flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-colors duration-200 ${
        isOverPlayground ? "bg-white/10 border-white/30" : ""
      }`}
    >
      <CardBody className="p-0 flex flex-col min-h-[300px] h-[400px] sm:h-[500px] lg:h-[calc(100vh-240px)] lg:max-h-[calc(100vh-240px)] relative">
        <DroppableArea
          className="flex-1 flex flex-col p-4 lg:p-6"
          id="playground-area"
          isOver={isOverPlayground}
        >
          <div className="flex-1 rounded-lg flex flex-col overflow-visible relative">
            {isEmpty && placeholderComponent ? (
              <div className="flex items-center justify-center h-full">
                {placeholderComponent}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col relative">
                <div
                  className="grid grid-cols-2 gap-3 md:gap-4 h-full"
                  style={{ gridTemplateRows: "1fr 1fr" }}
                >
                  {children}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <ChatInput
              externalMessage={externalMessage}
              widgetContext={widgetContext}
              onExternalMessageClear={onExternalMessageClear}
              onImageGeneration={onImageGeneration}
            />
          </div>
        </DroppableArea>
      </CardBody>
    </Card>
  );
};

export const GridDropZone: React.FC<{
  position: number;
  isOverPlayground?: boolean;
}> = ({ position, isOverPlayground = false }) => {
  return (
    <DroppableArea
      className={`h-full border-2 border-dashed rounded-lg flex items-center justify-center transition-all duration-200 ${
        isOverPlayground
          ? "border-blue-400/50 bg-blue-400/10"
          : "border-white/20 bg-white/5"
      }`}
      id={`drop-zone-${position}`}
      isOver={isOverPlayground}
    >
      <div className="text-center text-white/40">
        <Icon
          className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2"
          icon="material-symbols:add-rounded"
        />
        <p className="text-xs md:text-sm font-medium">Drop Widget Here</p>
        <p className="text-[10px] md:text-xs mt-1 text-white/30">
          Position {position + 1}
        </p>
      </div>
    </DroppableArea>
  );
};

export default GridLayout;
