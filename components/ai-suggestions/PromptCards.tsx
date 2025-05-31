"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";

export interface PromptItem {
  id: number;
  text: string;
}

interface PromptCardProps {
  prompt: PromptItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  isDisabled?: boolean;
}

export const PromptCard = ({
  prompt,
  index,
  isSelected,
  onSelect,
  isDisabled = false,
}: PromptCardProps) => {
  const disabled = !isSelected && isDisabled;

  return (
    <motion.div
      key={prompt.id}
      animate={{
        opacity: disabled ? 0.5 : 1,
        y: 0,
        transition: {
          duration: 0.3,
          delay: 0.1 + index * 0.1,
          ease: "easeOut",
        },
      }}
      className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      }}
      initial={{ opacity: 0, y: 10 }}
      whileHover={{
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -3,
        transition: {
          duration: 0.2,
        },
      }}
      onClick={() => {
        if (!disabled) {
          onSelect();
        }
      }}
    >
      <Card
        className={`h-full backdrop-blur-md border shadow-lg relative overflow-hidden transition-all duration-300 ${
          isSelected
            ? "bg-white/15 border-white/40"
            : "bg-white/5 border-white/10"
        }`}
      >
        {isSelected && (
          <div className="absolute top-3 right-3 bg-white/80 rounded-full p-1 z-20 shadow-md">
            <Icon className="text-gray-900" icon="mdi:check" width="16" />
          </div>
        )}

        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${
            isSelected
              ? "bg-white/60"
              : "bg-gradient-to-b from-white/30 to-white/10"
          }`}
        />

        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full opacity-30" />

        <CardBody className="py-5 px-5">
          <p className="text-white/90 relative z-10">{prompt.text}</p>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export const allPromptSuggestions = [
  {
    id: 1,
    text: "Create a responsive pricing table for a SaaS product",
  },
  {
    id: 2,
    text: "Design a landing page with a hero section and feature grid",
  },
  {
    id: 3,
    text: "Generate an animated dashboard with data visualizations",
  },
  {
    id: 4,
    text: "Build a user profile page with settings and preferences",
  },
  {
    id: 5,
    text: "Create a multi-step form with validation and progress tracking",
  },
  {
    id: 6,
    text: "Design a dark mode toggle with smooth transition effects",
  },
  {
    id: 7,
    text: "Develop an e-commerce product page with image gallery",
  },
  {
    id: 8,
    text: "Build a custom modal dialog with animations",
  },
  {
    id: 9,
    text: "Create an interactive map visualization with data overlays",
  },
  {
    id: 10,
    text: "Design a responsive blog layout with featured posts",
  },
  {
    id: 11,
    text: "Build a file upload component with progress indicators",
  },
  {
    id: 12,
    text: "Generate an API documentation page with code examples",
  },
  {
    id: 13,
    text: "Create a calendar interface with event scheduling",
  },
  {
    id: 14,
    text: "Design a social media profile with activity feed",
  },
  {
    id: 15,
    text: "Develop an interactive quiz with scoring system",
  },
];
