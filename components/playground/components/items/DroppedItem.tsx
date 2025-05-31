"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { WidgetRenderer } from "../../widgets";
import { DataBreakdown } from "../../../data-analysis/DataBreakdown";

interface DroppedItemProps {
  id: string;
  type: "prompt" | "widget";
  content: {
    title?: string;
    text?: string;
    description?: string;
    icon?: string;
    image?: string;
    originalId?: number;
  };
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isDisabled: boolean;
  isDocumentAI?: boolean;
  uploadedFile?: File | null;
  onFileUpload?: (file: File) => void;
  isImageGeneration?: boolean;
  onExampleClick?: (prompt: string) => void;
  selectedCount?: number;
  onSummarize?: (file: File) => void;
  onFileRemove?: () => void;
  isExpanded?: boolean;
  currentImagePrompt?: string;
  isGeneratingImage?: boolean;
  originalId?: number;
  isDataAnalysis?: boolean;
  dataUploadedFile?: File | null;
  onDataFileUpload?: (file: File) => void;
  onDataFileRemove?: () => void;
  onDataAnalyze?: (file: File) => void;
  onDataDrillDown?: (chartType: string, data: any) => void;
  drillDownData?: { chartType: string; data: any } | null;
  isDataAnalyzed?: boolean;
  currentMessage?: string;
  onSendMessage?: (message: string) => void;
}

const DroppedItem: React.FC<DroppedItemProps> = ({
  id,
  type,
  content,
  onRemove,
  onSelect,
  isSelected,
  isDisabled,
  isDocumentAI = false,
  uploadedFile,
  onFileUpload,
  isImageGeneration = false,
  onExampleClick,
  selectedCount = 0,
  onSummarize,
  onFileRemove,
  isExpanded = false,
  currentImagePrompt = "",
  isGeneratingImage = false,
  originalId,
  isDataAnalysis = false,
  dataUploadedFile,
  onDataFileUpload,
  onDataFileRemove,
  onDataAnalyze,
  onDataDrillDown,
  drillDownData,
  isDataAnalyzed = false,
  currentMessage,
  onSendMessage,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();

      return;
    }

    if (!isExpanded) {
      onSelect(id);
    }
  };

  const handleCloseClick = () => {
    if (isExpanded) {
      onSelect(id);
    } else {
      onRemove(id);
    }
  };

  const widgetId = originalId || content.originalId || 0;

  return (
    <motion.div
      layout
      animate={{
        opacity: isDisabled ? 0.5 : 1,
        y: 0,
        scale: 1,
      }}
      className={`h-full ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      whileHover={{
        scale: isDisabled || isExpanded ? 1 : 1.02,
        y: isDisabled || isExpanded ? 0 : -3,
        transition: {
          duration: 0.2,
        },
      }}
      onClick={handleClick}
    >
      {type === "widget" ? (
        isExpanded &&
        (widgetId === 5 ||
          widgetId === 2 ||
          widgetId === 4 ||
          widgetId === 9 ||
          widgetId === 10) ? (
          <div className="h-full relative overflow-hidden transition-all duration-300 bg-transparent rounded-lg">
            
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 z-30">
              
              <div className="bg-white/80 rounded-full p-1 shadow-md">
                <Icon className="text-gray-900" icon="mdi:check" width="14" />
              </div>

              
              <Button
                isIconOnly
                className="bg-black/20 backdrop-blur-sm min-w-0 hover:bg-black/30 text-white/60 hover:text-white w-6 h-6"
                size="sm"
                onPress={handleCloseClick}
              >
                <Icon icon="mdi:close" width="14" />
              </Button>
            </div>

            
            <div className="h-full p-4 sm:p-6 relative z-10">
              <div className="h-full overflow-y-auto">
                
                {widgetId === 4 && drillDownData ? (
                  <DataBreakdown
                    data={drillDownData.data}
                    isExpanded={isExpanded}
                    onBack={() =>
                      onDataDrillDown?.(drillDownData.chartType, null)
                    }
                  />
                ) : (
                  <WidgetRenderer
                    currentImagePrompt={currentImagePrompt}
                    dataUploadedFile={dataUploadedFile}
                    isDataAnalyzed={isDataAnalyzed}
                    isExpanded={isExpanded}
                    isGeneratingImage={isGeneratingImage}
                    selectedCount={selectedCount}
                    uploadedFile={uploadedFile}
                    widgetId={widgetId}
                    onDataAnalyze={onDataAnalyze}
                    onDataDrillDown={onDataDrillDown}
                    onDataFileRemove={onDataFileRemove}
                    onDataFileUpload={onDataFileUpload}
                    onExampleClick={onExampleClick}
                    onFileRemove={onFileRemove}
                    onFileUpload={onFileUpload}
                    onSummarize={onSummarize}
                    currentMessage={currentMessage}
                    onSendMessage={onSendMessage}
                  />
                )}
              </div>
            </div>
          </div>
        ) :
        isExpanded ? (
          <div className="h-full relative overflow-hidden transition-all duration-300 bg-transparent rounded-lg">
            
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 z-30">
              
              <div className="bg-white/80 rounded-full p-1 shadow-md">
                <Icon className="text-gray-900" icon="mdi:check" width="14" />
              </div>

              
              <Button
                isIconOnly
                className="bg-black/20 backdrop-blur-sm min-w-0 hover:bg-black/30 text-white/60 hover:text-white w-6 h-6"
                size="sm"
                onPress={handleCloseClick}
              >
                <Icon icon="mdi:close" width="14" />
              </Button>
            </div>

            
            <div className="h-full pt-12 p-6 relative z-10">
              <div className="h-full flex flex-col items-center justify-center text-center">
                
                {content.icon && (
                  <div className="mb-4 p-4 rounded-full bg-white/10 backdrop-blur-sm">
                    <Icon
                      className="text-white w-12 h-12"
                      icon={content.icon}
                    />
                  </div>
                )}

                
                <div className="w-full max-w-md">
                  <h4 className="font-semibold text-lg text-white leading-tight mb-2">
                    {content.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {content.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card
            className={`transition-all duration-300 relative overflow-hidden h-full ${
              isSelected ? "bg-transparent" : "bg-transparent"
            }`}
          >
            
            {isSelected && (
              <div className="absolute top-2 left-2 bg-white/80 rounded-full p-1 z-20 shadow-md">
                <Icon className="text-gray-900" icon="mdi:check" width="14" />
              </div>
            )}

            
            <Button
              isIconOnly
              className="absolute top-2 right-2 z-20 bg-black/20 backdrop-blur-sm min-w-0 hover:bg-black/30 text-white/60 hover:text-white w-6 h-6"
              size="sm"
              onPress={handleCloseClick}
            >
              <Icon icon="mdi:close" width="14" />
            </Button>

            
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />

            <CardBody className="p-3 flex flex-col items-center justify-center text-center relative z-10 h-full">
              
              {content.icon && (
                <div className="mb-2 p-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <Icon className="text-white w-6 h-6" icon={content.icon} />
                </div>
              )}

              
              <div className="w-full">
                <h4 className="font-semibold text-xs text-white leading-tight mb-1">
                  {content.title}
                </h4>
                <p className="text-white/60 text-[10px] line-clamp-2">
                  {content.description}
                </p>
              </div>
            </CardBody>
          </Card>
        )
      ) :
      isExpanded ? (
        <div className="h-full relative overflow-hidden transition-all duration-300 bg-transparent rounded-lg">
          
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 z-30">
            
            <div className="bg-blue-500 rounded-full p-1 shadow-md">
              <Icon className="text-white" icon="mdi:check" width="14" />
            </div>

            
            <Button
              isIconOnly
              className="bg-black/20 backdrop-blur-sm min-w-0 hover:bg-black/30 text-white/60 hover:text-white w-6 h-6"
              size="sm"
              onPress={handleCloseClick}
            >
              <Icon icon="mdi:close" width="14" />
            </Button>
          </div>

          
          <div className="h-full pt-12 p-6 relative z-10">
            <div className="h-full flex items-center justify-center text-center">
              <div className="w-full max-w-2xl">
                <div className="mb-6 p-4 rounded-full bg-blue-500/20 backdrop-blur-sm inline-block">
                  <Icon
                    className="text-blue-400 w-12 h-12"
                    icon="mdi:message-text"
                  />
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  {content.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card
          className={`transition-all duration-300 relative overflow-hidden h-full ${
            isSelected ? "bg-blue-500/20" : "bg-white/10 hover:bg-white/15"
          }`}
        >
          {isSelected && (
            <div className="absolute top-2 left-2 bg-blue-500 rounded-full p-1 z-20">
              <Icon className="text-white" icon="mdi:check" width="14" />
            </div>
          )}
          <Button
            isIconOnly
            className="absolute top-2 right-2 z-20 bg-black/20 backdrop-blur-sm min-w-0 hover:bg-black/30 text-white/60 hover:text-white w-6 h-6"
            size="sm"
            onPress={handleCloseClick}
          >
            <Icon icon="mdi:close" width="14" />
          </Button>
          <CardBody className="p-3 pt-4 h-full flex items-center">
            <p className="text-white/90 text-xs line-clamp-3 leading-relaxed">
              {content.text}
            </p>
          </CardBody>
        </Card>
      )}
    </motion.div>
  );
};

export default DroppedItem;
