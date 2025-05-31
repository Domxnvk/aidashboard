"use client";

import { useState, useCallback } from "react";

interface UseWidgetSelectionProps {
  onWidgetSelect?: (widgetId: string | null) => void;
}

export const useWidgetSelection = ({
  onWidgetSelect,
}: UseWidgetSelectionProps = {}) => {
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const handleWidgetSelect = useCallback(
    (widgetId: string) => {
      setSelectedWidgetId((prevId) => {
        const newId = prevId === widgetId ? null : widgetId;

        onWidgetSelect?.(newId);

        return newId;
      });
    },
    [onWidgetSelect],
  );

  const clearSelection = useCallback(() => {
    setSelectedWidgetId(null);
    onWidgetSelect?.(null);
  }, [onWidgetSelect]);

  const isWidgetSelected = useCallback(
    (widgetId: string) => {
      return selectedWidgetId === widgetId;
    },
    [selectedWidgetId],
  );

  return {
    selectedWidgetId,
    handleWidgetSelect,
    clearSelection,
    isWidgetSelected,
    hasSelection: selectedWidgetId !== null,
  };
};

export default useWidgetSelection;
