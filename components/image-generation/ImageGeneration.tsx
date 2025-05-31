"use client";

import React from "react";

import ImagePromptInput from "./ImagePromptInput";

interface ImageGenerationProps {
  onExampleClick?: (prompt: string) => void;
  className?: string;
  selectedCount?: number;
  isExpanded?: boolean;
  currentPrompt?: string;
  isGenerating?: boolean;
}

export const ImageGeneration: React.FC<ImageGenerationProps> = ({
  onExampleClick,
  className = "",
  selectedCount = 0,
  isExpanded = false,
  currentPrompt = "",
  isGenerating = false,
}) => {

  return (
    <div className={`w-full h-full ${className}`}>
      <ImagePromptInput
        currentPrompt={currentPrompt}
        isExpanded={isExpanded}
        isGenerating={isGenerating}
        selectedCount={selectedCount}
        onExampleClick={onExampleClick}
      />
    </div>
  );
};

export default ImageGeneration;
