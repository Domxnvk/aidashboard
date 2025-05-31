"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface PlaygroundPlaceholderProps {
  isOver: boolean;
}

const PlaygroundPlaceholder: React.FC<PlaygroundPlaceholderProps> = ({
  isOver,
}) => {
  return (
    <motion.div
      animate={{
        opacity: isOver ? 0.8 : 0.6,
        scale: isOver ? 1.05 : 1,
      }}
      className="text-center p-8 w-full h-full flex flex-col items-center justify-center"
    >
      <Icon
        className={`text-white/40 w-16 h-16 mx-auto mb-4 ${
          isOver ? "animate-pulse" : ""
        }`}
        icon={
          isOver
            ? "material-symbols:download"
            : "material-symbols:touch-app-outline-rounded"
        }
      />
      <h3 className="text-xl font-semibold text-white/80 mb-2">
        {isOver ? "Drop Here!" : "Your Playground"}
      </h3>
      <p className="text-white/60 max-w-md">
        {isOver
          ? "Release to add this item to your playground"
          : "Drag elements from your selections to build your project here. Select additional widgets and prompts to enhance your creation."}
      </p>
    </motion.div>
  );
};

export default PlaygroundPlaceholder;
