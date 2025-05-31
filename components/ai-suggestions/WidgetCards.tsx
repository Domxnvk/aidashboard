"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";

export interface WidgetItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface WidgetCardProps {
  widget: WidgetItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  isDisabled?: boolean;
  isExpanded?: boolean;
}

export const WidgetCard = ({
  widget,
  index,
  isSelected,
  onSelect,
  isDisabled = false,
  isExpanded = false,
}: WidgetCardProps) => {
  const disabled = !isSelected && isDisabled;

  return (
    <motion.div
      key={widget.id}
      animate={{
        opacity: disabled ? 0.5 : 1,
        y: 0,
        transition: {
          duration: 0.3,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      className={`h-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      }}
      initial={{ opacity: 0, y: 10 }}
      whileHover={{
        scale: disabled ? 1 : 1.01,
        y: disabled ? 0 : -2,
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
        className={`py-4 backdrop-blur-md border shadow-xl relative overflow-hidden transition-all duration-300 ${
          !isExpanded ? "h-full" : ""
        } ${
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

        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />

        <CardBody
          className={`p-4 flex flex-col items-center justify-center text-center relative z-10 ${!isExpanded ? "h-full" : "min-h-[120px]"}`}
        >
          <div className="mb-3 p-3 rounded-full bg-white/10 backdrop-blur-sm">
            <Icon className="text-white w-8 h-8" icon={widget.icon} />
          </div>

          <div className="w-full">
            <h4 className="font-bold text-sm text-white leading-tight mb-2">
              {widget.title}
            </h4>
            <p className="text-white/60 text-xs line-clamp-2">
              {widget.description}
            </p>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export const allWidgetItems = [
  {
    id: 1,
    title: "Content Assistant",
    description: "Generate blog posts, marketing copy, and more",
    icon: "carbon:text-creation",
  },
  {
    id: 2,
    title: "Image Generator",
    description: "Create custom images with AI",
    icon: "carbon:image-search",
  },
  {
    id: 3,
    title: "Code Helper",
    description: "Get assistance with coding and debugging",
    icon: "carbon:code",
  },
  {
    id: 4,
    title: "Data Analysis",
    description: "Analyze and visualize your data",
    icon: "carbon:chart-line",
  },
  {
    id: 5,
    title: "Document AI",
    description: "Extract insights from your documents",
    icon: "carbon:document",
  },
  {
    id: 6,
    title: "Video Creator",
    description: "Generate videos from text descriptions",
    icon: "carbon:video",
  },
  {
    id: 7,
    title: "Translation Hub",
    description: "Translate content across multiple languages",
    icon: "carbon:translate",
  },
  {
    id: 8,
    title: "Chat Simulator",
    description: "Practice conversations with AI personas",
    icon: "carbon:chat",
  },
  {
    id: 9,
    title: "Music Composer",
    description: "Create original music with AI",
    icon: "carbon:music",
  },
  {
    id: 10,
    title: "Research Helper",
    description: "Find and summarize research papers",
    icon: "carbon:search-advanced",
  },
  {
    id: 11,
    title: "Presentation Maker",
    description: "Generate slides and presentations",
    icon: "carbon:presentation-file",
  },
  {
    id: 12,
    title: "Voice Synthesizer 1",
    description: "Convert text to natural-sounding speech",
    icon: "carbon:microphone",
  },
  {
    id: 13,
    title: "Email Assistant",
    description: "Generate professional emails and responses",
    icon: "carbon:email",
  },
  {
    id: 14,
    title: "Social Media Manager",
    description: "Create engaging posts across platforms",
    icon: "carbon:logo-instagram",
  },
  {
    id: 15,
    title: "Budget Tracker",
    description: "Monitor expenses and financial planning",
    icon: "carbon:money",
  },
];
