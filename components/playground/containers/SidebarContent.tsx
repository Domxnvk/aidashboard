"use client";

import React from "react";
import { Icon } from "@iconify/react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import DroppableArea from "../components/dnd/DroppableArea";
import { SortableItem } from "../components/dnd/SortableContainer";
import { allWidgetItems } from "../../ai-suggestions/WidgetCards";

interface SidebarContentProps {
  selectedWidgets: number[];
  sidebarWidgetIds: string[];
  hasPlaygroundSelection: boolean;
  isOverSidebar: boolean;
  playgroundItemCount: number;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  selectedWidgets,
  sidebarWidgetIds,
  hasPlaygroundSelection,
  isOverSidebar,
  playgroundItemCount,
}) => {
  return (
    <DroppableArea
      className="p-4 lg:p-6 overflow-auto h-full relative"
      id="sidebar-area"
      isOver={isOverSidebar}
    >
      <div className={hasPlaygroundSelection ? "pointer-events-none" : ""}>
        {selectedWidgets.length > 0 && (
          <div className="mb-6">
            <SortableContext
              items={sidebarWidgetIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-4">
                {selectedWidgets.map((id, index) => {
                  const widget = allWidgetItems.find((w) => w.id === id);
                  const isDisabledDueToPlaygroundFull = index === 4 && playgroundItemCount >= 4;

                  return widget ? (
                    <SortableItem
                      key={id}
                      disabled={hasPlaygroundSelection || isDisabledDueToPlaygroundFull}
                      id={`widget-${id}`}
                    >
                      <div className={`bg-white/10 rounded-lg p-4 cursor-grab hover:bg-white/20 transition-colors min-h-[80px] flex items-center gap-3 ${isDisabledDueToPlaygroundFull ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div className="flex-shrink-0 p-2 rounded-full bg-white/10">
                          <Icon
                            className="text-white w-6 h-6"
                            icon={widget.icon}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm mb-1 truncate">
                            {widget.title}
                          </h4>
                          <p className="text-white/70 text-xs line-clamp-2">
                            {widget.description}
                          </p>
                        </div>
                      </div>
                    </SortableItem>
                  ) : null;
                })}
              </div>
            </SortableContext>
          </div>
        )}
      </div>

      {selectedWidgets.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white/50">
            <Icon
              className="w-12 h-12 mx-auto mb-2 text-white/30"
              icon="material-symbols:inbox-outline"
            />
            <p>All items moved to playground</p>
            <p className="text-sm mt-2">
              Drag items back here from the playground
            </p>
          </div>
        </div>
      )}
    </DroppableArea>
  );
};

export default SidebarContent;
