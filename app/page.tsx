"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { AISuggestions } from "@/components/ai-suggestions/AISuggestions";
import Playground from "@/components/playground/Playground";

export default function Home() {
  // State to track the current view
  const [currentView, setCurrentView] = useState<"selection" | "playground">(
    "selection",
  );

  // State to store selections
  // const [selectedPrompts, setSelectedPrompts] = useState<number[]>([]);
  const [selectedWidgets, setSelectedWidgets] = useState<number[]>([]);
  
  // State to track number of items in playground
  const [playgroundItemCount, setPlaygroundItemCount] = useState(0);

  // Handle showing the playground
  const handleShowPlayground = (prompts: number[], widgets: number[]) => {
    // setSelectedPrompts(prompts);
    setSelectedWidgets(widgets);
    setCurrentView("playground");
  };

  // Handle returning to the selection screen
  const handleBackToSelection = () => {
    // Just change the view without resetting the selections
    setCurrentView("selection");
  };

  return (
    // Using flex-1 to take available space and center content
    <section className="flex-1 flex flex-col items-center justify-center w-full py-6 md:py-8">
      <AnimatePresence mode="wait">
        {currentView === "selection" ? (
          <AISuggestions
            key="selection-view"
            initialWidgets={selectedWidgets}
            onShowPlayground={handleShowPlayground}
            playgroundItemCount={playgroundItemCount}
          />
        ) : (
          <Playground
            key="playground-view"
            selectedPrompts={[]}
            selectedWidgets={selectedWidgets}
            onBackToSelection={handleBackToSelection}
            onPlaygroundItemCountChange={setPlaygroundItemCount}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
