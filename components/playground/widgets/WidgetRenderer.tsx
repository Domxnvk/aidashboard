"use client";

import React from "react";

import { DocumentAI } from "../../document-ai";
import { ImageGeneration } from "../../image-generation";
import { DataAnalysis } from "../../data-analysis";
import { MusicComposer } from "../../music-composer";
import { ResearchHelper } from "../../research-helper";

interface WidgetRendererProps {
  widgetId: number;

  isExpanded?: boolean;

  uploadedFile?: File | null;
  onFileUpload?: (file: File) => void;
  onFileRemove?: () => void;
  onSummarize?: (file: File) => void;

  currentImagePrompt?: string;
  isGeneratingImage?: boolean;
  selectedCount?: number;
  onExampleClick?: (prompt: string) => void;

  dataUploadedFile?: File | null;
  onDataFileUpload?: (file: File) => void;
  onDataFileRemove?: () => void;
  onDataAnalyze?: (file: File) => void;
  onDataDrillDown?: (chartType: string, data: any) => void;
  isDataAnalyzed?: boolean;

  currentMessage?: string;
  onSendMessage?: (message: string) => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widgetId,
  isExpanded = false,
  uploadedFile,
  onFileUpload,
  onFileRemove,
  onSummarize,
  currentImagePrompt,
  isGeneratingImage,
  selectedCount,
  onExampleClick,
  dataUploadedFile,
  onDataFileUpload,
  onDataFileRemove,
  onDataAnalyze,
  onDataDrillDown,
  isDataAnalyzed,
  currentMessage,
  onSendMessage,
}) => {
  switch (widgetId) {
    case 2:
      return (
        <ImageGeneration
          currentPrompt={currentImagePrompt}
          isExpanded={isExpanded}
          isGenerating={isGeneratingImage}
          selectedCount={selectedCount}
          onExampleClick={onExampleClick}
        />
      );

    case 4:
      return (
        <DataAnalysis
          isAnalyzed={isDataAnalyzed}
          isExpanded={isExpanded}
          uploadedFile={dataUploadedFile}
          onAnalyze={onDataAnalyze}
          onDrillDown={onDataDrillDown}
          onFileRemove={onDataFileRemove}
          onFileUpload={onDataFileUpload}
        />
      );

    case 5:
      return (
        <DocumentAI
          isExpanded={isExpanded}
          uploadedFile={uploadedFile}
          onFileRemove={onFileRemove}
          onFileUpload={onFileUpload}
          onSummarize={onSummarize}
        />
      );

    case 9:
      return <MusicComposer isExpanded={isExpanded} />;

    case 10:
      return (
        <ResearchHelper
          isExpanded={isExpanded}
          currentMessage={currentMessage || ""}
          onSendMessage={onSendMessage || (() => {})}
        />
      );

    default:
      return null;
  }
};

export default WidgetRenderer;
