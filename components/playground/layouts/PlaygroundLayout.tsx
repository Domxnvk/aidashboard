"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { Card, CardBody, CardHeader } from "@heroui/card";

interface PlaygroundLayoutProps {
  onBackToSelection: () => void;
  sidebar: React.ReactNode;
  content: React.ReactNode;
  isOverSidebar?: boolean;
  hasPlaygroundSelection?: boolean;
}

export const PlaygroundLayout: React.FC<PlaygroundLayoutProps> = ({
  onBackToSelection,
  sidebar,
  content,
  isOverSidebar = false,
  hasPlaygroundSelection = false,
}) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex-1 flex flex-col"
      exit={{ opacity: 0, y: 20 }}
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Button
          className="mr-4 bg-white/10 backdrop-blur-md border border-white/20"
          radius="full"
          size="sm"
          startContent={<Icon icon="mdi:arrow-left" width="18" />}
          variant="flat"
          onPress={onBackToSelection}
        >
          Back to Selection
        </Button>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Playground
        </h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6 min-h-0">
        <Card
          className={`w-full lg:w-1/5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl transition-colors duration-200 ${
            isOverSidebar ? "bg-white/10 border-white/30" : ""
          } ${hasPlaygroundSelection ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <CardHeader className="px-4 py-3 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white">
              Your Selections
            </h3>
          </CardHeader>
          <CardBody className="p-0 h-[300px] lg:h-[calc(100vh-300px)] max-h-[300px] lg:max-h-[calc(100vh-300px)]">
            {sidebar}
          </CardBody>
        </Card>

        {content}
      </div>
    </motion.div>
  );
};

export default PlaygroundLayout;
