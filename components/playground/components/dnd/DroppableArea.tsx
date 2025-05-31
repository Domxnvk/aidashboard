"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableAreaProps {
  id: string;
  isOver?: boolean;
  children?: React.ReactNode;
  placeholder?: React.ReactNode;
  className?: string;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({
  id,
  isOver = false,
  children,
  placeholder,
  className = "",
}) => {
  const {
    setNodeRef,
    node,
    rect,
    isOver: dropIsOver,
    active,
  } = useDroppable({
    id,
  });

  const hasContent = React.Children.count(children) > 0;

  return (
    <div
      ref={setNodeRef}
      className={`
        relative w-full h-full
        ${isOver ? "bg-white/5" : ""} 
        transition-all duration-200 ease-in-out
        touch-none
        ${className}
      `}
      data-droppable-id={id}
      style={{ touchAction: "none" }}
    >
      {!hasContent && placeholder}
      {hasContent && children}
    </div>
  );
};

export default DroppableArea;
