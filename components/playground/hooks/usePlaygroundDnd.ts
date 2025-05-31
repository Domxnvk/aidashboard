import { useState, useEffect } from "react";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { allPromptSuggestions } from "../../ai-suggestions/PromptCards";
import { allWidgetItems } from "../../ai-suggestions/WidgetCards";

interface DroppedItem {
  id: string;
  originalId: number;
  type: "prompt" | "widget";
  position: number;
  content: {
    title?: string;
    text?: string;
    description?: string;
    icon?: string;
  };
}

interface UseUnifiedDndProps {
  initialSelectedPrompts: number[];
  initialSelectedWidgets: number[];
}

export function useUnifiedDnd({
  initialSelectedPrompts,
  initialSelectedWidgets,
}: UseUnifiedDndProps) {
  const [selectedPrompts, setSelectedPrompts] = useState<number[]>(
    initialSelectedPrompts,
  );
  const [selectedWidgets, setSelectedWidgets] = useState<number[]>(
    initialSelectedWidgets,
  );
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [isOverPlayground, setIsOverPlayground] = useState(false);
  const [isOverSidebar, setIsOverSidebar] = useState(false);

  const [selectedPlaygroundItemId, setSelectedPlaygroundItemId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    };
  }, [activeId]);

  const getActiveItem = (): { type: "prompt" | "widget"; data: any } | null => {
    if (!activeId) return null;

    const id = activeId.toString();

    if (id.startsWith("prompt-")) {
      const promptId = parseInt(id.replace("prompt-", ""));
      const prompt = allPromptSuggestions.find((p) => p.id === promptId);

      return prompt ? { type: "prompt", data: prompt } : null;
    }

    if (id.startsWith("widget-")) {
      const widgetId = parseInt(id.replace("widget-", ""));
      const widget = allWidgetItems.find((w) => w.id === widgetId);

      return widget ? { type: "widget", data: widget } : null;
    }

    if (id.startsWith("dropped-")) {
      const droppedItem = droppedItems.find((item) => item.id === id);

      if (droppedItem) {
        return {
          type: droppedItem.type as "prompt" | "widget",
          data: droppedItem,
        };
      }
    }

    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (selectedPlaygroundItemId !== null) {
      return;
    }
    
    const activeId = event.active.id.toString();
    if (activeId.startsWith("widget-") && droppedItems.length >= 4) {
      const widgetIndex = selectedWidgets.findIndex(
        (id) => `widget-${id}` === activeId
      );
      if (widgetIndex === 4) {
        return;
      }
    }
    
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (selectedPlaygroundItemId !== null) {
      return;
    }

    const { over, active } = event;
    const overElementId = over?.id?.toString();
    const activeElementId = active?.id?.toString();

    if (
      overElementId === "playground-area" ||
      overElementId?.startsWith("drop-zone-")
    ) {
      setIsOverPlayground(true);
      setIsOverSidebar(false);
    } else if (overElementId === "sidebar-area") {
      setIsOverSidebar(true);
      setIsOverPlayground(false);
    } else {
      if (activeElementId && overElementId) {
        if (overElementId.startsWith("dropped-")) {
          setIsOverPlayground(true);
          setIsOverSidebar(false);
        }
        else if (
          overElementId.startsWith("prompt-") ||
          overElementId.startsWith("widget-")
        ) {
          setIsOverSidebar(true);
          setIsOverPlayground(false);
        }
      } else {
        setIsOverPlayground(false);
        setIsOverSidebar(false);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (selectedPlaygroundItemId !== null) {
      setActiveId(null);
      setIsOverPlayground(false);
      setIsOverSidebar(false);

      return;
    }

    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setIsOverPlayground(false);
      setIsOverSidebar(false);

      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId.startsWith("prompt-") && overId.startsWith("prompt-")) {
      const activeIndex = selectedPrompts.findIndex(
        (id) => `prompt-${id}` === activeId,
      );
      const overIndex = selectedPrompts.findIndex(
        (id) => `prompt-${id}` === overId,
      );

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setSelectedPrompts(arrayMove(selectedPrompts, activeIndex, overIndex));
      }
    } else if (activeId.startsWith("widget-") && overId.startsWith("widget-")) {
      const activeIndex = selectedWidgets.findIndex(
        (id) => `widget-${id}` === activeId,
      );
      const overIndex = selectedWidgets.findIndex(
        (id) => `widget-${id}` === overId,
      );

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setSelectedWidgets(arrayMove(selectedWidgets, activeIndex, overIndex));
      }
    } else if (
      activeId.startsWith("dropped-") &&
      overId.startsWith("dropped-")
    ) {
      const activeIndex = droppedItems.findIndex(
        (item) => item.id === activeId,
      );
      const overIndex = droppedItems.findIndex((item) => item.id === overId);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setDroppedItems(arrayMove(droppedItems, activeIndex, overIndex));
      }
    }
    else if (
      overId === "playground-area" ||
      (overId && overId.startsWith("dropped-")) ||
      (overId && overId.startsWith("drop-zone-"))
    ) {
      if (activeId.startsWith("prompt-") || activeId.startsWith("widget-")) {
        if (overId && overId.startsWith("drop-zone-")) {
          const position = parseInt(overId.replace("drop-zone-", ""));

          moveToPlayground(activeId, position);
        } else {
          moveToPlayground(activeId);
        }
      }
    } else if (
      overId === "sidebar-area" ||
      (overId && overId.startsWith("prompt-")) ||
      (overId && overId.startsWith("widget-"))
    ) {
      if (activeId.startsWith("dropped-")) {
        moveToSidebar(activeId);
      }
    }

    setActiveId(null);
    setIsOverPlayground(false);
    setIsOverSidebar(false);
  };

  const moveToPlayground = (activeId: string, targetPosition?: number) => {
    if (droppedItems.length >= 4) {
      if (activeId.startsWith("widget-")) {
        const widgetIndex = selectedWidgets.findIndex(
          (id) => `widget-${id}` === activeId
        );
        if (widgetIndex === 4) {
          return;
        }
      }
    }

    const getNextAvailablePosition = () => {
      if (targetPosition !== undefined) {
        const isOccupied = droppedItems.some(
          (item) => item.position === targetPosition,
        );

        if (!isOccupied) {
          return targetPosition;
        }
      }

      for (let i = 0; i < 4; i++) {
        if (!droppedItems.some((item) => item.position === i)) {
          return i;
        }
      }

      return null;
    };

    const position = getNextAvailablePosition();
    
    if (position === null) {
      return;
    }

    if (activeId.startsWith("prompt-")) {
      const originalId = parseInt(activeId.replace("prompt-", ""));
      const prompt = allPromptSuggestions.find((p) => p.id === originalId);

      if (prompt) {
        setSelectedPrompts((prev) => prev.filter((id) => id !== originalId));
        setDroppedItems((prev) => [
          ...prev,
          {
            id: `dropped-prompt-${originalId}-${Date.now()}`,
            originalId,
            type: "prompt",
            position,
            content: { text: prompt.text },
          },
        ]);
      }
    } else if (activeId.startsWith("widget-")) {
      const originalId = parseInt(activeId.replace("widget-", ""));
      const widget = allWidgetItems.find((w) => w.id === originalId);

      if (widget) {
        setSelectedWidgets((prev) => prev.filter((id) => id !== originalId));
        setDroppedItems((prev) => [
          ...prev,
          {
            id: `dropped-widget-${originalId}-${Date.now()}`,
            originalId,
            type: "widget",
            position,
            content: {
              title: widget.title,
              description: widget.description,
              icon: widget.icon,
            },
          },
        ]);
      }
    }
  };

  const moveToSidebar = (activeId: string) => {
    const droppedItem = droppedItems.find((item) => item.id === activeId);

    if (droppedItem) {
      if (droppedItem.type === "prompt") {
        setSelectedPrompts((prev) =>
          prev.includes(droppedItem.originalId)
            ? prev
            : [...prev, droppedItem.originalId],
        );
      } else if (droppedItem.type === "widget") {
        setSelectedWidgets((prev) =>
          prev.includes(droppedItem.originalId)
            ? prev
            : [...prev, droppedItem.originalId],
        );
      }

      setDroppedItems((prev) => prev.filter((item) => item.id !== activeId));
    }
  };

  const handleRemoveItem = (id: string) => {
    if (selectedPlaygroundItemId === id) {
      setSelectedPlaygroundItemId(null);
    }
    moveToSidebar(id);
  };

  const handlePlaygroundItemSelect = (id: string) => {
    if (selectedPlaygroundItemId === id) {
      setSelectedPlaygroundItemId(null);
    } else {
      setSelectedPlaygroundItemId(id);
    }
  };

  return {
    selectedPrompts,
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
  };
}

export default useUnifiedDnd;
