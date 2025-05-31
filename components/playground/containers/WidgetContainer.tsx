"use client";

import React from "react";

import { SortableItem } from "../components/dnd/SortableContainer";
import DroppedItem from "../components/items/DroppedItem";

interface WidgetContainerProps {
  item: any;
  isSelected: boolean;
  isDisabled: boolean;
  isExpanded: boolean;
  hasPlaygroundSelection: boolean;
  uploadedFile: File | null;
  imageGenSelectionCount: number;
  currentImagePrompt: string;
  isGeneratingImage: boolean;
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onSummarize: (file: File) => void;
  onExampleClick: (prompt: string) => void;
  dataUploadedFile: File | null;
  onDataFileUpload: (file: File) => void;
  onDataFileRemove: () => void;
  onDataAnalyze: (file: File) => void;
  onDataDrillDown: (chartType: string, data: any) => void;
  drillDownData?: { chartType: string; data: any } | null;
  currentMessage?: string;
  onSendMessage?: (message: string) => void;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  item,
  isSelected,
  isDisabled,
  isExpanded,
  hasPlaygroundSelection,
  uploadedFile,
  imageGenSelectionCount,
  currentImagePrompt,
  isGeneratingImage,
  onFileUpload,
  onFileRemove,
  onRemove,
  onSelect,
  onSummarize,
  onExampleClick,
  dataUploadedFile,
  onDataFileUpload,
  onDataFileRemove,
  onDataAnalyze,
  onDataDrillDown,
  drillDownData,
  currentMessage,
  onSendMessage,
}) => {
  const isDocumentAI = item.originalId === 5;
  const isImageGeneration = item.originalId === 2;
  const isDataAnalysis = item.originalId === 4;
  const isResearchHelper = item.originalId === 10;

  const commonProps = {
    content: item.content,
    id: item.id,
    isDisabled,
    isExpanded,
    isSelected,
    type: item.type,
    originalId: item.originalId,
    onRemove,
    onSelect,
  };

  const documentAIProps = isDocumentAI
    ? {
        isDocumentAI: true,
        uploadedFile,
        onFileUpload,
        onFileRemove,
        onSummarize,
      }
    : {};

  const imageGenerationProps = isImageGeneration
    ? {
        isImageGeneration: true,
        selectedCount: imageGenSelectionCount,
        currentImagePrompt,
        isGeneratingImage,
        onExampleClick,
      }
    : {};

  const dataAnalysisProps = isDataAnalysis
    ? {
        isDataAnalysis: true,
        dataUploadedFile,
        onDataFileUpload,
        onDataFileRemove,
        onDataAnalyze,
        onDataDrillDown,
        drillDownData,
      }
    : {};

  const researchHelperProps = isResearchHelper
    ? {
        currentMessage,
        onSendMessage,
      }
    : {};

  return (
    <SortableItem
      key={item.id}
      disabled={isExpanded ? false : hasPlaygroundSelection}
      id={item.id}
    >
      <div
        className={isExpanded ? "w-full h-full relative" : "relative h-full"}
      >
        <DroppedItem
          {...commonProps}
          {...documentAIProps}
          {...imageGenerationProps}
          {...dataAnalysisProps}
          {...researchHelperProps}
        />
      </div>
    </SortableItem>
  );
};

export default WidgetContainer;
