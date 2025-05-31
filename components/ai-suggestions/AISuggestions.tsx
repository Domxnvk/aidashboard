"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import { WidgetCard, allWidgetItems, WidgetItem } from "./WidgetCards";
import ExploreModal from "./ExploreModal";

const WIDGET_DISPLAY_COUNT = 6;

const MAX_WIDGET_SELECTIONS = 5;

const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

interface AISuggestionsProps {
  onShowPlayground: (
    selectedPrompts: number[],
    selectedWidgets: number[],
  ) => void;
  initialWidgets?: number[];
  playgroundItemCount?: number;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({
  onShowPlayground,
  initialWidgets = [],
  playgroundItemCount = 0,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [displayedWidgets, setDisplayedWidgets] = useState<WidgetItem[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isWidgetsModalOpen, setIsWidgetsModalOpen] = useState(false);

  const [selectedWidgets, setSelectedWidgets] =
    useState<number[]>(initialWidgets);

  const randomizeSelections = useCallback(() => {
    const shuffledWidgets = shuffleArray(allWidgetItems);

    return {
      widgets: shuffledWidgets.slice(0, WIDGET_DISPLAY_COUNT),
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const { widgets } = randomizeSelections();

    const ensureSelectedItems = (
      items: WidgetItem[],
      selectedIds: number[],
    ) => {
      const displayedIds = items.map((item) => item.id);

      const missingIds = selectedIds.filter((id) => !displayedIds.includes(id));

      if (missingIds.length === 0) {
        return items;
      }

      const missingItems = missingIds
        .map((id) => {
          return allWidgetItems.find((item) => item.id === id);
        })
        .filter(Boolean) as WidgetItem[];

      const updatedItems = [...items];

      missingItems.forEach((item, index) => {
        if (index < updatedItems.length) {
          const nonSelectedIndex = updatedItems.findIndex(
            (i) => !selectedIds.includes(i.id),
          );

          if (nonSelectedIndex !== -1) {
            updatedItems[nonSelectedIndex] = item;
          }
        }
      });

      return updatedItems;
    };

    if (initialWidgets.length > 0) {
      const updatedWidgets = ensureSelectedItems(
        widgets,
        initialWidgets,
      ) as WidgetItem[];

      setDisplayedWidgets(updatedWidgets);
    } else {
      setDisplayedWidgets(widgets);
    }
  }, [randomizeSelections, initialWidgets]);

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    setSelectedWidgets([]);

    setTimeout(() => {
      const { widgets } = randomizeSelections();

      setDisplayedWidgets(widgets);
      setRefreshKey((prev) => prev + 1);
      setIsRefreshing(false);
    }, 200);
  };

  const toggleWidgetSelection = (id: number) => {
    setSelectedWidgets((prev) => {
      if (prev.includes(id)) {
        return prev.filter((widgetId) => widgetId !== id);
      }

      if (prev.length >= MAX_WIDGET_SELECTIONS) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const openWidgetsModal = () => setIsWidgetsModalOpen(true);

  const closeWidgetsModal = () => setIsWidgetsModalOpen(false);

  const hasSelections = selectedWidgets.length > 0;

  const totalSelections = selectedWidgets.length;

  const handleLetsGo = () => {
    onShowPlayground([], selectedWidgets);
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
      <motion.div
        animate={{ opacity: 1 }}
        className="w-full flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left">
              What would you like to create today?
            </h2>
          </div>

          <Button
            className="mt-4 md:mt-0 px-5 h-11 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white shadow-md"
            isDisabled={isRefreshing}
            radius="full"
            startContent={
              <Icon
                className={isRefreshing ? "animate-spin" : ""}
                icon="mdi:refresh"
                width="18"
              />
            }
            variant="flat"
            onPress={handleRefresh}
          >
            Refresh Ideas
          </Button>
        </div>

        <div className="space-y-10 w-full flex-1 flex flex-col justify-between">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-semibold text-white/90">
                AI Widgets
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">
                  {selectedWidgets.length}/{MAX_WIDGET_SELECTIONS}
                </span>
                <Button
                  className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white shadow-sm"
                  endContent={<Icon icon="mdi:arrow-right" width="14" />}
                  radius="full"
                  size="sm"
                  variant="flat"
                  onPress={openWidgetsModal}
                >
                  Explore More
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence key={`widgets-${refreshKey}`} mode="wait">
                {displayedWidgets.map((widget, index) => {
                  const isAlreadySelected = selectedWidgets.includes(widget.id);
                  const playgroundIsFull = playgroundItemCount >= 4;
                  const selectionLimitReached =
                    selectedWidgets.length >= MAX_WIDGET_SELECTIONS;

                  const isDisabled =
                    (!isAlreadySelected && selectionLimitReached) ||
                    (!isAlreadySelected &&
                      selectedWidgets.length === 4 &&
                      playgroundIsFull);

                  return (
                    <div
                      key={widget.id}
                      aria-disabled={isDisabled}
                      aria-pressed={selectedWidgets.includes(widget.id)}
                      className={
                        isDisabled ? "opacity-50 cursor-not-allowed" : ""
                      }
                      role="button"
                      tabIndex={isDisabled ? -1 : 0}
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          !isDisabled &&
                          (e.key === "Enter" || e.key === " ")
                        ) {
                          e.preventDefault();
                          toggleWidgetSelection(widget.id);
                        }
                      }}
                    >
                      <WidgetCard
                        index={index}
                        isSelected={selectedWidgets.includes(widget.id)}
                        widget={widget}
                        onSelect={() => {
                          if (!isDisabled) {
                            toggleWidgetSelection(widget.id);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full flex justify-center mt-auto mb-4">
            <Button
              className={`px-8 py-6 text-lg font-medium shadow-lg transition-all duration-300 ${
                hasSelections
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/50"
              }`}
              isDisabled={!hasSelections}
              radius="full"
              size="lg"
              startContent={
                <Icon
                  className={hasSelections ? "text-white" : "text-white/50"}
                  icon="material-symbols:rocket-launch"
                  width="24"
                />
              }
              variant="flat"
              onPress={handleLetsGo}
            >
              {hasSelections
                ? "Access Playground"
                : "Select Something to Begin"}
            </Button>
          </div>
        </div>
      </motion.div>

      <ExploreModal
        isOpen={isWidgetsModalOpen}
        items={allWidgetItems}
        playgroundItemCount={playgroundItemCount}
        selectedIds={selectedWidgets}
        title="Explore AI Widgets"
        totalSelections={totalSelections}
        type="widgets"
        onClose={closeWidgetsModal}
        onSelect={toggleWidgetSelection}
      />
    </div>
  );
};
