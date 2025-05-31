"use client";

import React from "react";

import PlaygroundContainer from "./containers/PlaygroundContainer";

interface PlaygroundProps {
  selectedPrompts: number[];
  selectedWidgets: number[];
  onBackToSelection: () => void;
  onPlaygroundItemCountChange?: (count: number) => void;
}

export const Playground: React.FC<PlaygroundProps> = ({
  selectedPrompts,
  selectedWidgets,
  onBackToSelection,
  onPlaygroundItemCountChange,
}) => {
  return (
    <PlaygroundContainer
      selectedPrompts={selectedPrompts}
      selectedWidgets={selectedWidgets}
      onBackToSelection={onBackToSelection}
      onPlaygroundItemCountChange={onPlaygroundItemCountChange}
    />
  );
};

export default Playground;
