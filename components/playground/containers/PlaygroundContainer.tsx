"use client";

import React from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  pointerWithin,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { DocumentSummaryModal } from "../../document-ai";
import PlaygroundLayout from "../layouts/PlaygroundLayout";
import ExpandedLayout from "../layouts/ExpandedLayout";
import GridLayout, { GridDropZone } from "../layouts/GridLayout";
import PlaygroundPlaceholder from "../components/ui/PlaygroundPlaceholder";
import DragOverlayItem from "../components/dnd/DragOverlayItem";
import useUnifiedDnd from "../hooks/usePlaygroundDnd";

import WidgetContainer from "./WidgetContainer";
import SidebarContent from "./SidebarContent";

interface PlaygroundContainerProps {
  selectedPrompts: number[];
  selectedWidgets: number[];
  onBackToSelection: () => void;
  onPlaygroundItemCountChange?: (count: number) => void;
}

export const PlaygroundContainer: React.FC<PlaygroundContainerProps> = ({
  selectedPrompts,
  selectedWidgets: initialSelectedWidgets,
  onBackToSelection,
  onPlaygroundItemCountChange,
}) => {
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const [dataUploadedFile, setDataUploadedFile] = React.useState<File | null>(
    null,
  );
  const [drillDownData, setDrillDownData] = React.useState<any>(null);
  const [isDataAnalyzed, setIsDataAnalyzed] = React.useState<boolean>(false);

  const [chatMessage, setChatMessage] = React.useState<string>("");
  const [imageGenSelectionCount, setImageGenSelectionCount] =
    React.useState<number>(0);
  const [currentImagePrompt, setCurrentImagePrompt] =
    React.useState<string>("");
  const [isGeneratingImage, setIsGeneratingImage] =
    React.useState<boolean>(false);

  const [summaryModalOpen, setSummaryModalOpen] =
    React.useState<boolean>(false);
  const [summaryFileName, setSummaryFileName] = React.useState<string>("");

  const [researchMessage, setResearchMessage] = React.useState<string>("");

  const {
    selectedPrompts: dndSelectedPrompts,
    selectedWidgets,
    droppedItems,
    activeId,
    isOverPlayground,
    isOverSidebar,
    selectedPlaygroundItemId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleRemoveItem,
    handlePlaygroundItemSelect,
    getActiveItem,
  } = useUnifiedDnd({
    initialSelectedPrompts: selectedPrompts,
    initialSelectedWidgets,
  });

  const hasPlaygroundSelection = selectedPlaygroundItemId !== null;

  const getCurrentWidgetContext = () => {
    if (!selectedPlaygroundItemId) return null;

    const selectedItem = droppedItems.find(
      (item) => item.id === selectedPlaygroundItemId,
    );

    if (!selectedItem) return null;

    switch (selectedItem.originalId) {
      case 2:
        return {
          type: "image-generation",
          title: "Image Generator",
          placeholder: "Describe the image you want to generate...",
          icon: selectedItem.content.icon || "carbon:image-search",
        };
      case 4:
        return {
          type: "data-analysis",
          title: "Data Analysis",
          placeholder: "Ask me to analyze your data...",
          icon: selectedItem.content.icon || "carbon:chart-line",
        };
      case 5:
        return {
          type: "document-ai",
          title: "Document AI",
          placeholder: "Ask questions about your document...",
          icon: selectedItem.content.icon || "carbon:document",
        };
      case 9:
        return {
          type: "music-composer",
          title: "Music Composer",
          placeholder: "Ask me to create music or modify settings...",
          icon: selectedItem.content.icon || "carbon:music",
        };
      case 10:
        return {
          type: "research-helper",
          title: "Research Helper",
          placeholder: "What would you like to research? (Type 'summarize' for summary)",
          icon: selectedItem.content.icon || "carbon:search-locate",
        };
      default:
        return {
          type: "general",
          title: selectedItem.content.title || "Widget",
          placeholder: "Chat with this widget...",
          icon: selectedItem.content.icon || "carbon:cube",
        };
    }
  };

  const currentWidgetContext = getCurrentWidgetContext();

  const handleImageGeneration = (prompt: string) => {
    if (currentWidgetContext?.type === "image-generation") {
      setCurrentImagePrompt(prompt);
      setIsGeneratingImage(true);
      setChatMessage("");

      setTimeout(() => {
        setIsGeneratingImage(false);
      }, 5000);
    }
  };

  const handleResearchMessage = (message: string) => {
    if (currentWidgetContext?.type === "research-helper") {
      setResearchMessage(message);
      setChatMessage("");
      setTimeout(() => {
        setResearchMessage("");
      }, 100);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: hasPlaygroundSelection ? 10000 : 3,
      },
      disabled: hasPlaygroundSelection,
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: hasPlaygroundSelection ? 10000 : 0,
        tolerance: hasPlaygroundSelection ? 10000 : 3,
      },
      disabled: hasPlaygroundSelection,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: hasPlaygroundSelection ? 10000 : 50,
        tolerance: hasPlaygroundSelection ? 10000 : 3,
      },
      disabled: hasPlaygroundSelection,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      disabled: hasPlaygroundSelection,
    }),
  );

  const customCollisionDetection = (args: any) => {
    const { active } = args;
    const activeId = active.id.toString();

    if (
      activeId.startsWith("prompt-") ||
      activeId.startsWith("widget-") ||
      activeId.startsWith("dropped-")
    ) {
      const pointerCollisions = pointerWithin(args);

      if (pointerCollisions && pointerCollisions.length > 0) {
        const playgroundCollision = pointerCollisions.find(
          (collision) => collision.id === "playground-area",
        );

        const dropZoneCollision = pointerCollisions.find((collision) =>
          collision.id.toString().startsWith("drop-zone-"),
        );

        const sidebarCollision = pointerCollisions.find(
          (collision) => collision.id === "sidebar-area",
        );

        if (dropZoneCollision) {
          return [dropZoneCollision];
        }
        if (playgroundCollision) {
          return [playgroundCollision];
        }
        if (sidebarCollision) {
          return [sidebarCollision];
        }
      }

      const sortableCollisions = closestCenter(args);

      if (sortableCollisions && sortableCollisions.length > 0) {
        return sortableCollisions;
      }
    }

    const defaultCollisions = closestCenter(args);

    return defaultCollisions || [];
  };

  const droppedWidgets = droppedItems.filter((item) => item.type === "widget");

  React.useEffect(() => {
    onPlaygroundItemCountChange?.(droppedItems.length);
  }, [droppedItems.length, onPlaygroundItemCountChange]);

  const sidebarPromptIds = dndSelectedPrompts.map((id) => `prompt-${id}`);
  const sidebarWidgetIds = selectedWidgets.map((id) => `widget-${id}`);
  const playgroundWidgetIds = droppedWidgets.map((item) => item.id);

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const sidebarContent = (
    <SidebarContent
      hasPlaygroundSelection={hasPlaygroundSelection}
      isOverSidebar={isOverSidebar}
      selectedWidgets={selectedWidgets}
      sidebarWidgetIds={sidebarWidgetIds}
      playgroundItemCount={droppedItems.length}
    />
  );

  const playgroundContent = hasPlaygroundSelection ? (
    <ExpandedLayout
      externalMessage={chatMessage}
      isOverPlayground={isOverPlayground}
      widgetContext={currentWidgetContext}
      onExternalMessageClear={() => setChatMessage("")}
      onImageGeneration={handleImageGeneration}
      onResearchMessage={handleResearchMessage}
    >
      <SortableContext
        items={playgroundWidgetIds}
        strategy={rectSortingStrategy}
      >
        {(() => {
          const selectedItem = droppedWidgets.find(
            (item) => item.id === selectedPlaygroundItemId,
          );

          if (!selectedItem) return null;

          return (
            <WidgetContainer
              key={selectedItem.id}
              currentImagePrompt={currentImagePrompt}
              dataUploadedFile={dataUploadedFile}
              drillDownData={drillDownData}
              hasPlaygroundSelection={hasPlaygroundSelection}
              imageGenSelectionCount={imageGenSelectionCount}
              isDisabled={false}
              isExpanded={true}
              isGeneratingImage={isGeneratingImage}
              isSelected={true}
              item={selectedItem}
              uploadedFile={uploadedFile}
              onDataAnalyze={() => {
                setIsDataAnalyzed(true);
              }}
              onDataDrillDown={(chartType, data) => {
                if (data) {
                  setIsDataAnalyzed(true);
                }
                setDrillDownData(data ? { chartType, data } : null);
              }}
              onDataFileRemove={() => {
                setDataUploadedFile(null);
                setIsDataAnalyzed(false);
              }}
              onDataFileUpload={setDataUploadedFile}
              onExampleClick={(prompt) => {
                setChatMessage(prompt);
                setImageGenSelectionCount((prev) => prev + 1);
                if (selectedItem.originalId === 2) {
                  handleImageGeneration(prompt);
                }
              }}
              onFileRemove={() => setUploadedFile(null)}
              onFileUpload={setUploadedFile}
              onRemove={handleRemoveItem}
              onSelect={(id) => {
                if (selectedPlaygroundItemId === id) {
                  if (selectedItem.originalId === 5) {
                    setUploadedFile(null);
                  }
                  if (selectedItem.originalId === 2) {
                    setCurrentImagePrompt("");
                    setIsGeneratingImage(false);
                  }
                  if (selectedItem.originalId === 4) {
                    setDataUploadedFile(null);
                    setDrillDownData(null);
                    setIsDataAnalyzed(false);
                  }
                }
                handlePlaygroundItemSelect(id);
              }}
              onSummarize={(file) => {
                setSummaryFileName(file.name);
                setSummaryModalOpen(true);
              }}
              currentMessage={researchMessage}
              onSendMessage={setResearchMessage}
            />
          );
        })()}
      </SortableContext>
    </ExpandedLayout>
  ) : (
    <GridLayout
      externalMessage={chatMessage}
      isEmpty={droppedItems.length === 0}
      isOverPlayground={isOverPlayground}
      placeholderComponent={<PlaygroundPlaceholder isOver={isOverPlayground} />}
      widgetContext={currentWidgetContext}
      onExternalMessageClear={() => setChatMessage("")}
      onImageGeneration={handleImageGeneration}
    >
      <SortableContext
        items={playgroundWidgetIds}
        strategy={rectSortingStrategy}
      >
        {Array.from({ length: 4 }, (_, position) => {
          const itemAtPosition = droppedWidgets.find(
            (item) => item.position === position,
          );

          if (itemAtPosition) {
            const isSelected = selectedPlaygroundItemId === itemAtPosition.id;
            const isDisabled = hasPlaygroundSelection && !isSelected;

            return (
              <WidgetContainer
                key={itemAtPosition.id}
                currentImagePrompt={currentImagePrompt}
                dataUploadedFile={dataUploadedFile}
                drillDownData={drillDownData}
                hasPlaygroundSelection={hasPlaygroundSelection}
                imageGenSelectionCount={imageGenSelectionCount}
                isDisabled={isDisabled}
                isExpanded={false}
                isGeneratingImage={isGeneratingImage}
                isSelected={isSelected}
                item={itemAtPosition}
                uploadedFile={uploadedFile}
                onDataAnalyze={() => {
                  setIsDataAnalyzed(true);
                }}
                onDataDrillDown={(chartType, data) => {
                  if (data) {
                    setIsDataAnalyzed(true);
                  }
                  setDrillDownData(data ? { chartType, data } : null);
                }}
                onDataFileRemove={() => {
                  setDataUploadedFile(null);
                  setIsDataAnalyzed(false);
                }}
                onDataFileUpload={setDataUploadedFile}
                onExampleClick={(prompt) => {
                  setChatMessage(prompt);
                  setImageGenSelectionCount((prev) => prev + 1);
                  if (itemAtPosition.originalId === 2) {
                    handleImageGeneration(prompt);
                  }
                }}
                onFileRemove={() => setUploadedFile(null)}
                onFileUpload={setUploadedFile}
                onRemove={handleRemoveItem}
                onSelect={(id) => {
                  if (selectedPlaygroundItemId === id) {
                    if (itemAtPosition.originalId === 5) {
                      setUploadedFile(null);
                    }
                    if (itemAtPosition.originalId === 2) {
                      setCurrentImagePrompt("");
                      setIsGeneratingImage(false);
                    }
                    if (itemAtPosition.originalId === 4) {
                      setDataUploadedFile(null);
                      setDrillDownData(null);
                      setIsDataAnalyzed(false);
                    }
                  }
                  handlePlaygroundItemSelect(id);
                }}
                onSummarize={(file) => {
                  setSummaryFileName(file.name);
                  setSummaryModalOpen(true);
                }}
                currentMessage={researchMessage}
                onSendMessage={setResearchMessage}
              />
            );
          }

          return (
            <GridDropZone
              key={`drop-zone-${position}`}
              isOverPlayground={isOverPlayground}
              position={position}
            />
          );
        })}
      </SortableContext>
    </GridLayout>
  );

  return (
    <DndContext
      collisionDetection={customCollisionDetection}
      measuring={measuringConfig}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <PlaygroundLayout
        content={playgroundContent}
        hasPlaygroundSelection={hasPlaygroundSelection}
        isOverSidebar={isOverSidebar}
        sidebar={sidebarContent}
        onBackToSelection={onBackToSelection}
      />

      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <div className="pointer-events-none opacity-95">
            {(() => {
              const activeItem = getActiveItem();

              return activeItem ? (
                <DragOverlayItem
                  data={activeItem.data}
                  type={activeItem.type}
                />
              ) : null;
            })()}
          </div>
        ) : null}
      </DragOverlay>

      <DocumentSummaryModal
        fileName={summaryFileName}
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
      />
    </DndContext>
  );
};

export default PlaygroundContainer;
