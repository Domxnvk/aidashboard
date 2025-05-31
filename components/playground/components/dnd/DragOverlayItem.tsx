"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface DragOverlayItemProps {
  type: "prompt" | "widget";
  data: any;
}

export const DragOverlayItem: React.FC<DragOverlayItemProps> = ({
  type,
  data,
}) => {
  if (type === "prompt") {
    const text = data.text || data.content?.text;

    return (
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-lg border border-white/30 shadow-xl text-gray-900 text-xs max-w-48 font-medium">
        {text}
      </div>
    );
  }

  if (type === "widget") {
    const widget = data.content ? data : data;
    const title = widget.title || widget.content?.title;
    const icon = widget.icon || widget.content?.icon;

    return (
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-lg border border-white/30 shadow-xl max-w-48">
        <div className="flex items-center gap-2">
          {icon && <Icon className="text-gray-900" icon={icon} width="16" />}
          <span className="text-gray-900 font-medium text-sm">{title}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default DragOverlayItem;
